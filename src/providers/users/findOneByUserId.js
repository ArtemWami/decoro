const cacheService = require('../../services/cache');
const userService = require('../../services/user');

const findOneByUserId = async (userId) => {
    const key = cacheService.users.getFindOneByUserIdKey({ userId });
    const cachedData = cacheService.client.get(key);
    if (cachedData !== undefined) {
        return cachedData;
    }

    const user = await userService.findUser.findOneByUserId({ userId });
    if (!user) {
        return null;
    }

    const data = user.toJSON();
    cacheService.client.set(key, data);
    return data;
};

module.exports = findOneByUserId;
