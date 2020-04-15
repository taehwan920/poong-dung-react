export function title(ctx) {
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('한강 수온 통계 그래프', 500, 58);
};


export function hourParams(ctx, arr) {

}


export const axisX = (ctx, hei) => {

    const startX = 100;
    const endX = 900;
    const positionY = 425;

    //axis X
    ctx.beginPath();
    ctx.moveTo(startX, positionY);
    ctx.lineTo(endX, positionY);
    ctx.lineWidth = 2;
    ctx.stroke();

    //axis X - graph lines
    const lastLine = hei - positionY + 50;
    const lineInterval = (hei - (hei - positionY) - lastLine) / 5;
    const startLine = positionY - lineInterval;

    const lineWidth = 2;
    const strokeStyle = 'rgba(255, 255, 255, 0.5)';

    for (let i = startLine, j = 0; i >= lastLine; i -= lineInterval, j++) {
        ctx.beginPath();
        ctx.moveTo(startX, i);
        ctx.lineTo(endX, i);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
        ctx.closePath();

        //temperature parameter
        const temps = ['-10℃', '0℃', '10℃', '20℃', '30℃'];
        ctx.font = '15.5px sans-serif';
        ctx.textAlign = 'end';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fillText(temps[j], startX - 10, i + 6);
    };

    //hours parameter
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
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
        ctx.closePath();
    }
};