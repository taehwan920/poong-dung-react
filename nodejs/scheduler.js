import schedule from 'node-schedule';
import { PythonShell } from 'python-shell';

const options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '/home/ubuntu/apps/git/poong-dung-react/nodejs/pythons',
    args: []
}

// C:/Users/taehw/Documents/poong-dung-react/nodejs/pythons
const schedulerInit = () => {
    const pyRun = () => {
        PythonShell.run('insert_data.py', options, (err, results) => {
            if (err) { throw err; }
            console.log(results)
        })
    }
    schedule.scheduleJob('0 35 14 * * *', () => pyRun());
    schedule.scheduleJob('0 30 0 * * *', () => pyRun());
    schedule.scheduleJob('0 30 6 * * *', () => pyRun());
    schedule.scheduleJob('0 30 12 * * *', () => pyRun());
    schedule.scheduleJob('0 30 18 * * *', () => pyRun());
};


export default schedulerInit;