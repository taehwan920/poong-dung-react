import schedule from 'node-schedule';
import { PythonShell } from 'python-shell';

const options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: 'C:/Users/taehw/Documents/poong-dung-react/nodejs/pythons',
    args: []
}

const schedulerInit = () => {
    const pyRun = () => {
        PythonShell.run('insert_data.py', options, (err, results) => {
            if (err) { throw err; }
            console.log(results)
        })
    }
    schedule.scheduleJob('0 15 0 * * *', () => pyRun());
    schedule.scheduleJob('0 15 6 * * *', () => pyRun());
    schedule.scheduleJob('0 15 12 * * *', () => pyRun());
    schedule.scheduleJob('0 15 18 * * *', () => pyRun());

};

export default schedulerInit;