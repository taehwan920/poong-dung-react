import schedule from 'node-schedule';

const schedulerInit = () => {
    schedule.scheduleJob('0 * * * * *', function () {
        console.log('0초!')
    });

    schedule.scheduleJob('10 * * * * *', function () {
        console.log('10초!')
    });

    schedule.scheduleJob('20 * * * * *', function () {
        console.log('20초!')
    });

    schedule.scheduleJob('30 * * * * *', function () {
        console.log('30초!')
    });

    schedule.scheduleJob('40 * * * * *', function () {
        console.log('40초!')
    });

    schedule.scheduleJob('50 * * * * *', function () {
        console.log('50초!')
    });
}

export default schedulerInit;