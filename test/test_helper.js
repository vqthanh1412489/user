require('../src/db');
const User = require('../src/user');

beforeEach('Remove all Collection User', async () => {
    await User.remove({});
});