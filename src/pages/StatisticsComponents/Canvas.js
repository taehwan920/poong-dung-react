import Axios from 'axios';


const Standard = {
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

export function AxisX(ctx) {
    const gphAxis = {
        startX: Standard.frameStartX,
        endX: Standard.frameEndX,
        startY: Standard.frameStartY,
        endY: Standard.frameEndY,
        intervalY: Standard.frameIntervalY
    }

    const temps = ['0℃', '5℃', '10℃', '15℃', '20℃', '25℃'];

    for (let i = gphAxis.endY, j = 0; i >= gphAxis.startY; i -= gphAxis.intervalY, j++) {
        ctx.beginPath();
        ctx.moveTo(gphAxis.startX, i);
        ctx.lineTo(gphAxis.endX, i);
        ctx.lineWidth = Standard.frameLineWidth;
        ctx.strokeStyle = Standard.frameStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        //temperature parameter
        ctx.font = '15.5px sans-serif';
        ctx.textAlign = 'end';
        ctx.textBaseline = 'middle'
        ctx.fillStyle = Standard.textFillStyle
        ctx.fillText(temps[j], gphAxis.startX - 10, i);
    };
};




export function Title(ctx) {
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = Standard.textFillStyle;
    ctx.fillText('한강 수온 통계 그래프', 500, 58);
};

export function LineColor(ctx) {
    const eg = {
        dailyColor: Standard.dailyColor,
        monthlyColor: Standard.monthlyColor,
        textX: 940,
        StartX: 800,
        EndX: 840,
        lineWidth: Standard.colorLineWidth,
        positionY1: 30,
        positionY2: 60
    }

    ctx.font = '12px sans-serif';
    ctx.textAlign = 'end';
    ctx.textBaseline = 'middle'
    ctx.fillStyle = Standard.textFillStyle;
    ctx.fillText('일일 변동 수온', eg.textX, eg.positionY1);
    ctx.fillText('전월 변동 수온', eg.textX, eg.positionY2);


    ctx.beginPath();
    ctx.moveTo(eg.StartX, eg.positionY1);
    ctx.lineTo(eg.EndX, eg.positionY1);
    ctx.lineWidth = eg.lineWidth;
    ctx.strokeStyle = eg.dailyColor;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(eg.StartX, eg.positionY2);
    ctx.lineTo(eg.EndX, eg.positionY2);
    ctx.lineWidth = eg.lineWidth;
    ctx.strokeStyle = eg.monthlyColor;
    ctx.stroke();
    ctx.closePath();
};

export function TickAndParams(ctx) {
    //hours ticks
    const tick = {
        startX: Standard.tickStartX,
        endX: Standard.tickEndX,
        intervalX: Standard.tickIntervalX,
        startY: Standard.tickStartY,
        endY: Standard.tickEndY
    }
    const notNow = tick.startX

    for (let i = tick.startX, j = 48; i <= tick.endX; i += tick.intervalX, j -= 6) {
        ctx.beginPath();
        ctx.moveTo(i, tick.endY);
        ctx.lineTo(i, tick.startY);
        ctx.lineWidth = Standard.frameLineWidth;
        ctx.strokeStyle = Standard.frameStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        if (i !== notNow) {
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = Standard.textFillStyle
            ctx.fillText(`${j}시간 전`, i - tick.intervalX, tick.endY + 20);
        } else {
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = Standard.textFillStyle
            ctx.fillText(`지금`, tick.endX, tick.endY + 20);
        }
    }
};


export const DrawGraph = async (ctx) => {
    const gph = {
        endX: Standard.tickEndX,
        intervalX: Standard.tickIntervalX,
        intervalY: Standard.frameIntervalY,
        startY: Standard.frameStartY,
        stdY: Standard.frameEndY - Standard.frameStartY
    };

    const dailyEndpoint = `http://localhost:8080/db/1/8`;
    const dailyJSON = await Axios.get(dailyEndpoint);

    const dailyTemps = dailyJSON.data.map(item => item.temperature);

    const dailyXYs = [];

    for (let i = 0; i < dailyTemps.length; i++) {
        const dailyTemp = tempCheck(dailyTemps[i], i);
        let dailyX = gph.endX - (gph.intervalX * i)
        let dailyY = (gph.intervalY * (25 - dailyTemp) / 5) + gph.startY;
        if (i === 0) {
            dailyX = gph.endX
        }
        drawPoint(ctx, dailyX, dailyY, true);
        dailyXYs.push({ X: dailyX, Y: dailyY });
    };
    drawLine(ctx, dailyXYs, true);

    const monthlyEndpoint = `http://localhost:8080/db/118/125`;
    const monthlyJSON = await Axios.get(monthlyEndpoint);

    const monthlyTemps = monthlyJSON.data.map(item => item.temperature);

    const monthlyXYs = [];

    for (let i = 0; i < monthlyTemps.length; i++) {
        const dailyTemp = tempCheck(monthlyTemps[i], i);
        let monthlyX = gph.endX - (gph.intervalX * i)
        let monthlyY = (gph.intervalY * (25 - dailyTemp) / 5) + gph.startY;
        if (i === 0) {
            monthlyX = gph.endX
        }
        drawPoint(ctx, monthlyX, monthlyY, false);
        monthlyXYs.push({ X: monthlyX, Y: monthlyY });
    };
    drawLine(ctx, monthlyXYs, false);
    // const monthlyAverage = (monthlyTemps.reduce((accu, curr) => accu + curr) / monthlyTemps.length).toFixed(1);
    // const monthly = {
    //     startX: Standard.tickStartX - 50,
    //     endX: Standard.tickEndX + 50,
    //     positionY: (gph.intervalY * (25 - monthlyAverage) / 5) + gph.startY,
    //     lineWidth: 4,
    //     strokeStyle: Standard.monthlyColor
    // }

    // ctx.beginPath();
    // ctx.moveTo(monthly.startX, monthly.positionY);
    // ctx.lineTo(monthly.endX, monthly.positionY);
    // ctx.lineWidth = monthly.lineWidth;
    // ctx.strokeStyle = monthly.strokeStyle;
    // ctx.stroke();
    // ctx.closePath();
};

// function dataParse(arr)


function tempCheck(temp, num) {
    if (temp === 99.9) {
        temp[num - 1]
            ? temp[num].temperature = temp[num - 1].temperature
            : temp[num].temperature = temp[num + 1].temperature;
    } else {
        return temp;
    }
};

function drawPoint(ctx, X, Y, bool) {
    ctx.beginPath();
    ctx.arc(X, Y, 6, Y - 5, Math.PI, true);
    ctx.lineWidth = Standard.colorLineWidth;
    ctx.fillStyle = bool ? Standard.dailyColor : Standard.monthlyColor;
    ctx.fill();
    ctx.closePath();
};

function drawLine(ctx, arr, bool) {
    let leftEnd = arr[0];

    for (let i = 1; i < arr.length; i++) {
        ctx.beginPath();
        ctx.moveTo(leftEnd.X, leftEnd.Y);
        leftEnd = arr[i]
        ctx.lineTo(leftEnd.X, leftEnd.Y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = bool ? Standard.dailyColor : Standard.monthlyColor;
        ctx.stroke();
        ctx.closePath();
    }
};
