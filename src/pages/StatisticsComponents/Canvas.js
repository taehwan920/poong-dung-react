export function title(ctx) {
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('한강 수온 통계 그래프', 500, 58);
};


export function lineColour(ctx) {
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
    const lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(colorXStart, positionY1);
    ctx.lineTo(colorXEnd, positionY1);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#C5F895';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(colorXStart, positionY2);
    ctx.lineTo(colorXEnd, positionY2);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#9972AE';
    ctx.stroke();
    ctx.closePath();
};


export function axisX(ctx, hei) {

    const startX = 100;
    const endX = 900;
    const positionY = 425;
    const axisStrokeStyle = 'rgba(255, 255, 255, 0.5)';


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

    const lineWidth = 2;

    for (let i = startLine, j = 0; i >= lastLine; i -= lineInterval, j++) {
        ctx.beginPath();
        ctx.moveTo(startX, i);
        ctx.lineTo(endX, i);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = axisStrokeStyle;
        ctx.stroke();
        ctx.closePath();

        //temperature parameter
        const temps = ['-10℃', '0℃', '10℃', '20℃', '30℃'];
        ctx.font = '15.5px sans-serif';
        ctx.textAlign = 'end';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fillText(temps[j], startX - 10, i + 6);
    };

    //hours ticks
    const verticalStart = 420;
    const verticalEnd = 430;
    const tickStart = startX + 100;
    const tickInterval = (endX - 200) / 8;
    const tickEnd = endX - tickInterval;

    for (let i = tickStart; i <= tickEnd; i += tickInterval) {
        ctx.beginPath();
        ctx.moveTo(i, verticalStart);
        ctx.lineTo(i, verticalEnd);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = axisStrokeStyle;
        ctx.stroke();
        ctx.closePath();
    }
};
