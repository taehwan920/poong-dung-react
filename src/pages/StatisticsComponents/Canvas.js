import Axios from 'axios';


const Standard = {
    canvasHeight: 500,
    frameStartX: 100,
    frameEndX: 900,
    frameEndY: function () { return this.canvasHeight - this.frameOnY + 50 },
    frameLineInterval: function () { return (this.frameOnY - this.frameEndY()) / 5 },
    frameStartY: function () { return this.frameOnY - this.frameLineInterval() },
    frameOnY: 425,
    frameLineWidth: 2,
    frameStrokeStyle: 'rgba(255, 255, 255, 0.5)',
    dailyColor: '#C5F895',
    weekColor: '#9972AE',
    tickStartY: 430,
    tickEndY: 420,
    tickStartX: function () { return this.frameStartX + 100 },
    tickInterval: function () { return (this.frameEndX - 200) / 8 },
    tickEndX: function () { return this.frameEndX - this.tickInterval() }
};


export function Title(ctx) {
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('한강 수온 통계 그래프', 500, 58);
};

export function LineColour(ctx) {
    const dailyColor = Standard.dailyColor,
        weekColor = Standard.weekColor,
        textX = 940,
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



export function AxisX(ctx) {
    const startAxisX = Standard.frameStartX,
        endAxisX = Standard.frameEndX,
        axisXOnY = Standard.frameOnY;

    //axis X
    ctx.beginPath();
    ctx.moveTo(startAxisX, axisXOnY);
    ctx.lineTo(endAxisX, axisXOnY);
    ctx.lineWidth = Standard.frameLineWidth;
    ctx.strokeStyle = Standard.frameStrokeStyle;
    ctx.stroke();

    //axis X - graph lines
    const lastLine = Standard.frameEndY(),
        lineInterval = Standard.frameLineInterval(),
        startLine = Standard.frameStartY();

    const temps = ['-10℃', '0℃', '10℃', '20℃', '30℃'];

    for (let i = startLine, j = 0; i >= lastLine; i -= lineInterval, j++) {
        ctx.beginPath();
        ctx.moveTo(startAxisX, i);
        ctx.lineTo(endAxisX, i);
        ctx.lineWidth = Standard.frameLineWidth;
        ctx.strokeStyle = Standard.frameStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        //temperature parameter
        ctx.font = '15.5px sans-serif';
        ctx.textAlign = 'end';
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fillText(temps[j], startAxisX - 10, i);
    };
};




export function TickAndParams(ctx) {
    //hours ticks
    const tickStartY = Standard.tickStartY,
        tickEndY = Standard.tickEndY,
        tickStartX = Standard.tickStartX(),
        tickInterval = Standard.tickInterval(),
        tickEndX = Standard.tickEndX(),
        notNow = tickStartX;
    for (let i = tickStartX, j = 48; i <= tickEndX; i += tickInterval, j -= 6) {
        ctx.beginPath();
        ctx.moveTo(i, tickStartY);
        ctx.lineTo(i, tickEndY);
        ctx.lineWidth = Standard.frameLineWidth;
        ctx.strokeStyle = Standard.frameStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        if (i !== notNow) {
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.fillText(`${j}시간 전`, i - tickInterval, tickStartY + 20);
        } else {
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.fillText(`지금`, tickEndX, tickStartY + 20);
        }
    }
};


export const DrawGraph = async (ctx) => {
    //set Grid of graph;
    const graphStartX = Standard.tickStartX(),
        graphEndX = Standard.tickEndX(),
        graphStartY = Standard.tickStartX(),
        graphEndY = Standard.tickEndX();

    const endpoint = `http://localhost:8080/db/1/30`;
    const data = await Axios.get(endpoint);
    const lastEight = data.data.slice(-8);
    lastEight.forEach(item => item.date = `${item.date.slice(-4, -2)}.${item.date.slice(-2)}`);
    lastEight.forEach(item => item.time = `${item.time < 10 ? `0${item.time}시` : `${item.time}시`}`);



}


