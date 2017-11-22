const Flowdock = require('Flowdock');
const Session = Flowdock.Session;

const myFlows = ['fee269c0-9d57-473e-b2d0-4bd7d4d55266', '6173d204-b13f-440b-a4ca-e1eaa822377b'];
const bellbotCommandToken = 'bellbot ';

const userName = process.argv[2];
const password = process.argv[3];

if (!userName || !password) {
    throw new Error('Error! Please supply flodock username and password as command args');
}

const session = new Session(userName, password);
const stream = session.stream(myFlows);

stream.on('message', message => {
    if (message.event === 'message' && message.content.toLowerCase().startsWith(bellbotCommandToken)) {
        handleMessage(message);
    }
});

session.on('error', err => {
    console.log('ERROR');
    console.log(err);
});

const handleMessage = message => {
    const command = message.content.slice(bellbotCommandToken.length).split(' ');
    console.log(command);
    if (command[0].toLowerCase() == 'say' && command[1].toLowerCase() == 'hi') {
        session.send('/messages', {
            flow: message.flow,
            thread_id: message.thread_id,
            event: 'message',
            content: 'hello!',
            external_user_name: 'bell-bot'
        });
    }
}