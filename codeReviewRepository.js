const bluebird = require('bluebird');
const redis = require('redis');
const config = require('./config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
    host: config.redis.host,
    password: config.redis.password
});

//const codeReviewKey = 'CodeReviews';
const codeReviewKey = 'test';

const addAsync = val => {
    return client.rpushAsync(codeReviewKey, val);
};

const getAllAsync = () => {
    return client.lrangeAsync(codeReviewKey, 0, 100);
};

module.exports = {
    addAsync: addAsync,
    getAllAsync: getAllAsync
}