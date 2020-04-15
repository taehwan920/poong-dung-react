import Axios from 'axios';

export function Title(ctx) {
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('한강 수온 통계 그래프', 500, 58);
};



const dailyColor = '#C5F895';
const weekColor = '#9972AE';

export function LineColour(ctx) {
    const textX = 940,
        positionY1 = 30,
        positionY2 = 60;

    ctx.font = '12px sans-serif';
    ctx.textAlign = 'end';
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('일일 변동 수온', textX, positionY1);
    ctx.fillText('주간 평균 수온', textX, positionY2);


    const colorXStart = 800;
    const colorXEnd = 840;
    const colorLineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(colorXStart, positionY1);
    ctx.lineTo(colorXEnd, positionY1);
    ctx.lineWidth = colorLineWidth;
    ctx.strokeStyle = dailyColor;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(colorXStart, positionY2);
    ctx.lineTo(colorXEnd, positionY2);
    ctx.lineWidth = colorLineWidth;
    ctx.strokeStyle = weekColor;
    ctx.stroke();
    ctx.closePath();
};



const startX = 100;
const endX = 900;
const positionY = 425;
const lineWidth = 2;
const axisStrokeStyle = 'rgba(255, 255, 255, 0.5)';

export function AxisX(ctx, hei) {

    //axis X
    ctx.beginPath();
    ctx.moveTo(startX, positionY);
    ctx.lineTo(endX, positionY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = axisStrokeStyle;
    ctx.stroke();

    //axis X - graph lines
    const lastLine = hei - positionY + 50;
    const lineInterval = (hei - (hei - positionY) - lastLine) / 5;
    const startLine = positionY - lineInterval;

    const temps = ['-10℃', '0℃', '10℃', '20℃', '30℃'];

    for (let i = startLine, j = 0; i >= lastLine; i -= lineInterval, j++) {
        ctx.beginPath();
        ctx.moveTo(startX, i);
        ctx.lineTo(endX, i);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = axisStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        //temperature parameter
        ctx.font = '15.5px sans-serif';
        ctx.textAlign = 'end';
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fillText(temps[j], startX - 10, i);
    };


};




export function TickAndParams(ctx) {
    //hours ticks
    const verticalStart = 420;
    const verticalEnd = 430;
    const tickStart = startX + 100;
    const tickInterval = (endX - 200) / 8;
    const tickEnd = endX - tickInterval;
    const notNow = tickStart;

    for (let i = tickStart, j = 48; i <= tickEnd; i += tickInterval, j -= 6) {
        ctx.beginPath();
        ctx.moveTo(i, verticalStart);
        ctx.lineTo(i, verticalEnd);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = axisStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        if (i !== notNow) {
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.fillText(`${j}시간 전`, i - tickInterval, verticalEnd + 20);
        } else {
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.fillText(`지금`, tickEnd, verticalEnd + 20);
        }

    }


};


// const endpoint = `http://localhost:8080/db/1/30`;
//     const data = await Axios.get(endpoint);
//     const lastEight = data.data.slice(-8);
//     lastEight.forEach(item => item.date = `${item.date.slice(-4, -2)}.${item.date.slice(-2)}`);
//     lastEight.forEach(item => item.time = `${item.time < 10 ? `0${item.time}시` : `${item.time}시`}`);