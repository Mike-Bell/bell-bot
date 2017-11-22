const config = require('./config');
const codeReviewRepository = require('./codeReviewRepository');
const Flowdock = require('Flowdock');
const Session = Flowdock.Session;

const session = new Session(config.flowdock.username, config.flowdock.password);
const stream = session.stream(config.flowdock.flowIds);

const bellbotCommandToken = 'bellbot ';

stream.on('message', message => {
    if (message.event === 'message' && message.content.toLowerCase().startsWith(bellbotCommandToken)) {
        handleMessage(message);
    }
});

session.on('error', err => {
    console.log('ERROR');
    console.log(err);
});

const reply = (msg, response) => {
    session.send('/messages', {
        flow: msg.flow,
        thread_id: msg.thread_id,
        event: 'message',
        content: response,
        external_user_name: 'bell-bot'
    });
};

const handleMessage = message => {
    const command = message.content.slice(bellbotCommandToken.length).split(' ');
    console.log(command);

    if (command[0].toLowerCase() == 'add') {
        const val = command[1];
        codeReviewRepository.addAsync(val).then(() => {
            reply(message, `ok, I added value [${val}]`);
        });
    }

    if (command[0].toLowerCase() == 'list') {
        codeReviewRepository.getAllAsync().then(result => {
            reply(message, result && result.join(', ') || '[None yet]');
        });
    }
}