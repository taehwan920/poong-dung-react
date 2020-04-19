import Axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { ENV } from '../../Env';


export default class extends React.Component {
    state = {
        errorOccurred: false
    }

    renderRedirect() {
        return (
            <Redirect to="/error" />
        )
    }

    Standard = {
        canvasHeight: 500,
        frameStartX: 100,
        frameEndX: 900,
        frameStartY: 125,
        frameEndY: 425,
        frameIntervalY: 60,
        frameLineWidth: 2,
        frameStrokeStyle: 'rgba(255, 255, 255, 0.5)',
        textFillStyle: 'rgba(255, 255, 255, 1)',
        dailyColor: '#C5F895',
        monthlyColor: '#9972AE',
        colorLineWidth: 3,
        tickEndY: 430,
        tickStartY: 420,
        tickStartX: 200, /* this.frameStartX + 100 */
        tickIntervalX: 87.5, /* (this.frameEndX - 200) / 8 */
        tickEndX: 812.5, /* this.frameEndX - this.tickInterval */
    };

    AxisX(ctx) {
        const gphAxis = {
            startX: this.Standard.frameStartX,
            endX: this.Standard.frameEndX,
            startY: this.Standard.frameStartY,
            endY: this.Standard.frameEndY,
            intervalY: this.Standard.frameIntervalY
        }

        const temps = ['0℃', '5℃', '10℃', '15℃', '20℃', '25℃'];

        for (let i = gphAxis.endY, j = 0; i >= gphAxis.startY; i -= gphAxis.intervalY, j++) {
            ctx.beginPath();
            ctx.moveTo(gphAxis.startX, i);
            ctx.lineTo(gphAxis.endX, i);
            ctx.lineWidth = this.Standard.frameLineWidth;
            ctx.strokeStyle = this.Standard.frameStrokeStyle;
            ctx.stroke();
            ctx.closePath();

            //temperature parameter
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'end';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = this.Standard.textFillStyle
            ctx.fillText(temps[j], gphAxis.startX - 10, i);
        };
    };




    Title(ctx) {
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = this.Standard.textFillStyle;
        ctx.fillText('한강 수온 통계 그래프', 500, 58);
    };

    LineColor(ctx) {
        const eg = {
            dailyColor: this.Standard.dailyColor,
            monthlyColor: this.Standard.monthlyColor,
            textX: 940,
            StartX: 800,
            EndX: 840,
            lineWidth: this.Standard.colorLineWidth,
            positionY1: 30,
            positionY2: 60
        }

        ctx.font = '12px sans-serif';
        ctx.textAlign = 'end';
        ctx.textBaseline = 'middle'
        ctx.fillStyle = this.Standard.textFillStyle;
        ctx.fillText('일일 변동 수온', eg.textX, eg.positionY1);
        ctx.fillText('전월 변동 수온', eg.textX, eg.positionY2);


        ctx.beginPath();
        ctx.moveTo(eg.StartX, eg.positionY1);
        ctx.lineTo(eg.EndX, eg.positionY1);
        ctx.lineWidth = eg.lineWidth;
        ctx.strokeStyle = eg.dailyColor;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(eg.StartX, eg.positionY2);
        ctx.lineTo(eg.EndX, eg.positionY2);
        ctx.lineWidth = eg.lineWidth;
        ctx.strokeStyle = eg.monthlyColor;
        ctx.stroke();
    };

    TickAndParams(ctx) {
        //hours ticks
        const tick = {
            startX: this.Standard.tickStartX,
            endX: this.Standard.tickEndX,
            intervalX: this.Standard.tickIntervalX,
            startY: this.Standard.tickStartY,
            endY: this.Standard.tickEndY
        }
        const notNow = tick.startX

        for (let i = tick.startX, j = 48; i <= tick.endX; i += tick.intervalX, j -= 6) {
            ctx.beginPath();
            ctx.moveTo(i, tick.endY);
            ctx.lineTo(i, tick.startY);
            ctx.lineWidth = this.Standard.frameLineWidth;
            ctx.strokeStyle = this.Standard.frameStrokeStyle;
            ctx.stroke();

            if (i !== notNow) {
                ctx.font = '15.5px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'
                ctx.fillStyle = this.Standard.textFillStyle
                ctx.fillText(`${j}시간 전`, i - tick.intervalX, tick.endY + 20);
            } else {
                ctx.font = '15.5px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle'
                ctx.fillStyle = this.Standard.textFillStyle
                ctx.fillText(`지금`, tick.endX, tick.endY + 20);
            }
        }
    };


    DrawGraph = async (ctx) => {
        try {
            const gph = {
                endX: this.Standard.tickEndX,
                intervalX: this.Standard.tickIntervalX,
                intervalY: this.Standard.frameIntervalY,
                startY: this.Standard.frameStartY,
                stdY: this.Standard.frameEndY - this.Standard.frameStartY
            };

            const dailyEndpoint = `${ENV.API_URL}/db/1/8`;
            const dailyJSON = await Axios.get(dailyEndpoint);
            const dailyDatas = dailyJSON.data;
            const dailyTemps = dailyDatas.map(item => item.temperature);

            const dailyXYs = [];

            for (let i = 0; i < dailyTemps.length; i++) {
                const dailyTemp = this.tempCheck(dailyTemps[i], i);
                let dailyX = gph.endX - (gph.intervalX * i)
                let dailyY = Number(((gph.intervalY * (25 - dailyTemp) / 5) + gph.startY).toFixed(1));
                if (i === 0) {
                    dailyX = gph.endX
                }
                this.drawPoint(ctx, dailyX, dailyY, true);
                dailyXYs.push({ X: dailyX, Y: dailyY });
            };
            this.drawLine(ctx, dailyXYs, true);

            const monthlyEndpoint = `${ENV.API_URL}/db/125/132`;
            const monthlyJSON = await Axios.get(monthlyEndpoint);
            const monthlyDatas = monthlyJSON.data;
            const monthlyTemps = monthlyDatas.map(item => item.temperature);

            const monthlyXYs = [];

            for (let i = 0; i < monthlyTemps.length; i++) {
                const dailyTemp = this.tempCheck(monthlyTemps[i], i);
                let monthlyX = gph.endX - (gph.intervalX * i)
                let monthlyY = Number(((gph.intervalY * (25 - dailyTemp) / 5) + gph.startY).toFixed(1));
                if (i === 0) {
                    monthlyX = gph.endX
                }
                this.drawPoint(ctx, monthlyX, monthlyY, false);
                monthlyXYs.push({ X: monthlyX, Y: monthlyY });
            };
            this.drawLine(ctx, monthlyXYs, false);


            dailyXYs.reverse();
            dailyTemps.reverse();
            monthlyXYs.reverse();
            monthlyTemps.reverse();
            const onCanvas = document.querySelector('#statistics');
            const tempBox = document.querySelectorAll('.sta-temp');
            const box1 = document.querySelector('.sta-box1');
            const box2 = document.querySelector('.sta-box2');
            if (onCanvas) {
                const coorX = {
                    0: [this.Standard.frameStartX, dailyXYs[0].X],
                    1: [dailyXYs[0].X, dailyXYs[1].X],
                    2: [dailyXYs[1].X, dailyXYs[2].X],
                    3: [dailyXYs[2].X, dailyXYs[3].X],
                    4: [dailyXYs[3].X, dailyXYs[4].X],
                    5: [dailyXYs[4].X, dailyXYs[5].X],
                    6: [dailyXYs[5].X, dailyXYs[6].X],
                    7: [dailyXYs[6].X, this.Standard.frameEndX]
                }
                ctx.save();
                onCanvas.addEventListener('mousemove', (e) => {
                    const mouseX = e.offsetX;
                    for (const key in coorX) {
                        if (mouseX > coorX[key][0] && mouseX <= coorX[key][1]) {
                            console.log(mouseX);
                            const numKey = Number(key);
                            tempBox.forEach(box => {
                                box.classList.add('sta-visualize');
                            });
                            box1.style.setProperty('top', `${dailyXYs[numKey].Y - 37}px`);
                            box1.style.setProperty('left', `${dailyXYs[numKey].X - 84}px`);
                            box1.innerHTML = `${dailyTemps[key]}℃`;
                            box2.style.setProperty('top', `${monthlyXYs[numKey].Y + 6}px`);
                            box2.style.setProperty('left', `${monthlyXYs[numKey].X + 2.5}px`);
                            box2.innerHTML = `${monthlyTemps[key]}℃`;
                        }
                    };
                });
                onCanvas.addEventListener('mouseleave', () => {
                    tempBox.forEach(box => { box.classList.remove('sta-visualize') })
                });
            };
        } catch {
            this.setState({ errorOccurred: true });
        }
    }

    tempCheck(temp, num) {
        if (temp === 99.9) {
            temp[num - 1]
                ? temp[num].temperature = temp[num - 1].temperature
                : temp[num].temperature = temp[num + 1].temperature;
        } else {
            return temp;
        }
    };

    drawPoint(ctx, X, Y, bool) {
        ctx.beginPath();
        ctx.arc(X, Y, 6, Y - 5, Math.PI, true);
        ctx.fillStyle = bool ? this.Standard.dailyColor : this.Standard.monthlyColor;
        ctx.fill();
        ctx.closePath();
    };

    drawLine(ctx, arr, bool) {
        let leftEnd = arr[0];

        for (let i = 1; i < arr.length; i++) {
            ctx.beginPath();
            ctx.moveTo(leftEnd.X, leftEnd.Y);
            leftEnd = arr[i]
            ctx.lineTo(leftEnd.X, leftEnd.Y);
            ctx.lineWidth = 4;
            ctx.strokeStyle = bool ? this.Standard.dailyColor : this.Standard.monthlyColor;
            ctx.stroke();
            ctx.closePath();
        }
    };

    componentDidMount() {
        const canvas = document.querySelector("#statistics");
        if (canvas) {
            const ctx = canvas.getContext("2d");
            canvas.width = 1000;
            canvas.height = 500;

            this.DrawGraph(ctx);
            this.Title(ctx);
            this.LineColor(ctx);
            this.AxisX(ctx);
            this.TickAndParams(ctx);
        }
    }

    render() {
        return (
            <div className="sta-tempBox">
                {this.state.errorOccurred
                    ? this.renderRedirect()
                    : [
                        <canvas id="statistics"></canvas>,
                        <div className="sta-box1 sta-temp">d</div>,
                        <div className="sta-box2 sta-temp">d</div>
                    ]}
            </div>
        )
    }
};





