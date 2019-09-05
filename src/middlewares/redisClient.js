const RedisStore = require('rate-limit-redis');
const redis = require('redis');

// create redis client
const getStore = () => {
  const url = process.env.REDISTOGO_URL || process.env.REDIS_URL;
  return url
    ? new RedisStore({
        client: redis.createClient({
          url,
        }),
      })
    : new RedisStore();
};

module.exports = getStore;
