const User = require('../../src/user');
const assert = require('assert');


describe('createUser', () => {
    let idUser;
    it('Co the tao 1 user voi thong tin day du', async () => {
        const thanh = new User({
            username: 'vqthanh1412489',
            password: '12345678910',
            email: 'vqthanh1412489@gmail.com'
        });
        idUser = thanh._id;
        await thanh.save();

        const user = await User.findById(idUser);
        assert.equal(user.username, 'vqthanh1412489');
    });

    it('Khong the tao User ma khong co Email', async () => {
        const thanh = new User({
            username: 'vqthanh1412489',
            password: '12345678910',
        });
        try{
            await thanh.save();
        }catch(err) {
            assert.equal(err.message, 'user validation failed: email: Path `email` is required.');
        }
    });

    it('Khong the tao 1 user khong co Username', async () => {
        const thanh = new User({
            email: 'vqthanh1412489@gmail.com',
            password: '12345678910',
        });
        try{
            await thanh.save();
        }catch(err) {
            assert.equal(err.message, 'user validation failed: username: Path `username` is required.');
        }
    });

    it('Khong the tao 1 user khong co Password', async () => {
        const thanh = new User({
            username: 'vqthanh1412489',
            email: 'vqthanh1412489@gmail.com',
        });
        try{
            await thanh.save();
        }catch(err) {
            assert.equal(err.message, 'user validation failed: password: Path `password` is required.');
        }
    });

    it('Khong the tao 1 user co Username < 10', async () => {
        const thanh = new User({
            username: '123456789',
            email: 'vqthanh1412489@gmail.com',
            password: '12345678910'
        });

        try{
            await thanh.save();
        }catch(err) {
            assert.equal(err.errors.username.kind, 'minlength');
            assert.equal(err.errors.username.path, 'username');
        }
    });
    it('Khong the tao 1 user co email < 11', async () => {
        const thanh = new User({
            username: '12345678910',
            email: '@gmail.com',
            password: '12345678910'
        });

        try{
            await thanh.save();
        }catch(err) {
            assert.equal(err.errors.email.kind, 'minlength');
            assert.equal(err.errors.email.path, 'email');
        }
    });
    it('Khong the tao 1 user co Password < 8', async () => {
        const thanh = new User({
            username: '12345678910',
            email: 'vqthanh1412489@gmail.com',
            password: '123'
        });

        try{
            await thanh.save();
        }catch(err) {
            assert.equal(err.errors.password.kind, 'minlength');
            assert.equal(err.errors.password.path, 'password');
        }
    });

    it('Khong the tao 2 User co username giong nhau', async () => {
        const thanh = new User({
            username: 'thanh12345678910',
            email: 'vqthanh1412489@gmail.com',
            password: '123123456123'
        });
        const thanh1 = new User({
            username: 'thanh12345678910',
            email: 'vqthanh1412489@gmail.com',
            password: '123123456123'
        });

        try{
            await thanh.save();
            await thanh1.save();
        }catch(err) {
            // Kiểm tra xem trong chuỗi lỗi xuất ra có từ 'duplicate key' không?
            // Nếu có thì là lỗi do nhập trùng nhau
            const arr = err.errmsg.toString().match(/duplicate key/g);
            assert.equal(arr.length, 1);
        }
    });
});