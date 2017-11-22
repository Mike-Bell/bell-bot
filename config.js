// Assumes you have a file here called config.json of the form {"flowdock": {"username": "", "password": "", "flowIds": ["", ""]}, "redis": {"host": "", "password": ""}}

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));

module.exports = config;