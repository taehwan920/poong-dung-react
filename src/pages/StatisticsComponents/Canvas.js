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
    textFillStyle: 'rgba(255, 255, 255, 1)',
    dailyColor: '#C5F895',
    weekColor: '#9972AE',
    colorLineWidth: 3,
    tickEndY: 430,
    tickStartY: 420,
    tickStartX: 200, /* this.frameStartX + 100 */
    tickIntervalX: 87.5, /* (this.frameEndX - 200) / 8 */
    tickEndX: 812.5, /* this.frameEndX - this.tickInterval */
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
        weekColor: Standard.weekColor,
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
    ctx.fillText('주간 평균 수온', eg.textX, eg.positionY2);


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
    ctx.strokeStyle = eg.weekColor;
    ctx.stroke();
    ctx.closePath();
};



export function AxisX(ctx) {
    const axisX = {
        startX: Standard.frameStartX,
        endX: Standard.frameEndX,
        onY: Standard.frameOnY
    }
    //axis X
    ctx.beginPath();
    ctx.moveTo(axisX.startX, axisX.onY);
    ctx.lineTo(axisX.endX, axisX.onY);
    ctx.lineWidth = Standard.frameLineWidth;
    ctx.strokeStyle = Standard.frameStrokeStyle;
    ctx.stroke();

    //axis X - graph lines
    const graphAxis = {
        startY: Standard.lineStartY,
        endY: Standard.lineEndY,
        intervalY: Standard.lineInterval

    }

    const temps = ['-10℃', '0℃', '10℃', '20℃', '30℃'];

    for (let i = graphAxis.endY, j = 0; i >= graphAxis.startY; i -= graphAxis.intervalY, j++) {
        ctx.beginPath();
        ctx.moveTo(axisX.startX, i);
        ctx.lineTo(axisX.endX, i);
        ctx.lineWidth = Standard.frameLineWidth;
        ctx.strokeStyle = Standard.frameStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        //temperature parameter
        ctx.font = '15.5px sans-serif';
        ctx.textAlign = 'end';
        ctx.textBaseline = 'middle'
        ctx.fillStyle = Standard.textFillStyle
        ctx.fillText(temps[j], axisX.startX - 10, i);
    };
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
        stdY: Standard.lineEndY - Standard.lineStartY,
        const: 2880
    };

    const endpoint = `http://localhost:8080/db/1/30`;
    const datas = await Axios.get(endpoint);

    const latestDatas = datas.data.slice(0, 8);
    latestDatas.forEach(item => item.date = `${item.date.slice(-4, -2)}.${item.date.slice(-2)}`);
    latestDatas.forEach(item => item.time = `${item.time < 10 ? `0${item.time}시` : `${item.time}시`}`);
    const latestTemp = latestDatas.map(item => item.temperature);

    for (let i = 7; i >= 0; i--) {
        const temperature = tempCheck(latestTemp[i], i);
        let dailyX = gph.endX - (gph.intervalX * i)
        let dailyY = (temperature / gph.stdY * gph.const);
        if (i === 0) {
            dailyX = gph.endX
        }
        drawPoint(ctx, dailyX, dailyY);


    }
}


function tempCheck(temp, num) {
    if (temp === 99.9) {
        temp[num - 1]
            ? temp[num].temperature = temp[num - 1].temperature
            : temp[num].temperature = temp[num + 1].temperature;
    } else {
        return temp;
    }
}

function drawPoint(ctx, X, Y) {
    ctx.beginPath();
    ctx.arc(X, Y, 5, Y - 5, Math.PI, true);
    ctx.lineWidth = Standard.colorLineWidth;
    ctx.fillStyle = Standard.dailyColor;
    ctx.fill();
    ctx.closePath();
}

// function drawLine(ctx, X, Y) {
//     const rightEnd = []
// }
