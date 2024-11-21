import redis from 'redis';
import { promisify } from 'util';

/*
 * Redis client
*/
class RedisClient {

    constructor() {
       this.client = redis.createClient();
       this.getAsync = promisify(this.client.get).bind(this.client);

       this.client.on('error', (err) => {
           console.log('Error ' + err);
       });
       this.client.on('connect', () => {
           console.log('Redis client connected');
       });

    }

    isAlive() {
        if (this.client) {
            return true;
        }
        return false;
    }

    async get(key) {
        return this.client.get(key);
    }
    /**
     * Sets key in redis service
     * @key {string} key to be set
     * @value {string} value to be set
     * @duration {number} duration in seconds
     */
    async set(key, value, duration) {
        return this.client.set(key, value, 'EX', duration);
    }

    /**
   * Deletes key in redis service
   * @key {string} key to be deleted
   * @return {undefined}  No return
   **/
    async del(key) {
        return this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;