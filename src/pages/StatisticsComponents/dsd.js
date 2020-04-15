const Standard = {
    canvasHeight: 500,
    frameStartX: 100,
    frameEndX: 900,
    frameEndY: () => this.canvasHeight - this.frameOnY + 50,
    frameLineInterval: () => (this.frameOnY - this.frameEndY()) / 5,
    frameStartY: () => this.frameOnY - this.frameLineInterval(),
    frameOnY: 425,
    frameLineWidth: 2,
    frameStrokeStyle: 'rgba(255, 255, 255, 0.5)',
    dailyColor: '#C5F895',
    weekColor: '#9972AE',
    tickStartY: 430,
    tickEndY: 420,
    tickStartX: () => this.frameStartX + 100,
    tickInterval: () => (this.frameEndX - 200) / 8,
    tickEndX: () => this.endAxisX - this.tickInterval()
};