const RedisStore = require('rate-limit-redis');
const redis = require('redis');

// create redis client
const getStore = () => {
  return process.env.REDISTOGO_URL
    ? redis.createClient({ url: process.env.REDISTOGO_URL })
    : new RedisStore();
};

module.exports = getStore;
