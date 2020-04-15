import Axios from 'axios';


const Standard = {
    canvasHeight: 500,
    frameStartX: 100,
    frameEndX: 900,
    frameOnY: 425,
    lineStartY: 125,
    lineEndY: 365, /* this.frameOnY - this.lineInterval */
    lineInterval: 60, /* (this.frameOnY - this.lineStartY) / 5 */
    frameLineWidth: 2,
    frameStrokeStyle: 'rgba(255, 255, 255, 0.5)',
    dailyColor: '#C5F895',
    weekColor: '#9972AE',
    colorLineWidth: 3,
    tickEndY: 430,
    tickStartY: 420,
    tickStartX: 100, /* this.frameStartX + 100 */
    tickInterval: 87.5, /* (this.frameEndX - 200) / 8 */
    tickEndX: 812.5, /* this.frameEndX - this.tickInterval */
};


export function Title(ctx) {
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('한강 수온 통계 그래프', 500, 58);
};

export function LineColor(ctx) {
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
    const colorLineWidth = Standard.colorLineWidth;
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
    const startLine = Standard.lineStartY,
        lineInterval = Standard.lineInterval,
        endLine = Standard.lineEndY;

    const temps = ['-10℃', '0℃', '10℃', '20℃', '30℃'];

    for (let i = endLine, j = 0; i >= startLine; i -= lineInterval, j++) {
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
    const tickEndY = Standard.tickEndY,
        tickStartY = Standard.tickStartY,
        tickStartX = Standard.tickStartX,
        tickInterval = Standard.tickInterval,
        tickEndX = Standard.tickEndX,
        notNow = tickStartX;
    for (let i = tickStartX, j = 48; i <= tickEndX; i += tickInterval, j -= 6) {
        ctx.beginPath();
        ctx.moveTo(i, tickEndY);
        ctx.lineTo(i, tickStartY);
        ctx.lineWidth = Standard.frameLineWidth;
        ctx.strokeStyle = Standard.frameStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        if (i !== notNow) {
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.fillText(`${j}시간 전`, i - tickInterval, tickEndY + 20);
        } else {
            ctx.font = '15.5px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.fillText(`지금`, tickEndX, tickEndY + 20);
        }
    }
};


export const DrawGraph = async (ctx) => {
    //set Grid of graph;
    const graphIntervalX = Standard.tickInterval,
        graphEndX = Standard.tickEndX,
        graphStandardY = Standard.frameOnY - Standard.lineStartY;

    const endpoint = `http://localhost:8080/db/1/30`;
    const datas = await Axios.get(endpoint);

    const latestDatas = datas.data.slice(0, 8);
    latestDatas.forEach(item => item.date = `${item.date.slice(-4, -2)}.${item.date.slice(-2)}`);
    latestDatas.forEach(item => item.time = `${item.time < 10 ? `0${item.time}시` : `${item.time}시`}`);
    const _latestDatas = Array.from(latestDatas);

    for (let i = 7; i >= 0; i--) {
        console.log(Standard.tickInterval);
        debugger;
        let dailyX = graphEndX - (graphIntervalX * i),
            dailyY = (_latestDatas[i].teperature) / (graphStandardY);
        if (i === 0) {
            dailyX = graphEndX
        }

        console.log(dailyX, dailyY);
        debugger;
        ctx.beginPath();
        ctx.moveTo(dailyX, dailyY);
        ctx.lineTo(dailyX, dailyY);
        ctx.lineWidth = Standard.colorLineWidth;
        ctx.strokeStyle = Standard.dailyColor;
        ctx.stroke();
        ctx.closePath();
    }


}


