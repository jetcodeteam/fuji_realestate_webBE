const RedisStore = require('rate-limit-redis');
const redis = require('redis');

// create redis client
const getStore = () => {
  return process.env.REDISTOGO_URL
    ? new RedisStore({
        client: redis.createClient({ url: process.env.REDISTOGO_URL }),
      })
    : new RedisStore();
};

module.exports = getStore;
