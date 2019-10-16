import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const block = (data) => {
    process.on('uncaughtException', (err) => {
        console.log('Caught exception: ' + err);
    })
    rl.on('SIGINT', () => {
        console.log(data);
        rl.pause();
    })
}

export default block;
