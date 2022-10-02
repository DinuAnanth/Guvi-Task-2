const redis = require('redis');
// 1 configure our redis
const redisClient = redis.createClient({
    port: 6379,
    host: '127.0.0.1'
});

module.exports = redisClient;