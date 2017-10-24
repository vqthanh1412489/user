const assert = require('assert');
const resquest = require('supertest');

const User = require('../../src/user');
const app = require('../../src/index');

describe('/signin Router', () => {
    // Tao User moi de login
    beforeEach('Signup new a user', async () => {
        await User.signUp('vqthanh1', '123456', 'vqthanh1@gmail.com');
    });
    
    it('Co the dang nhap voi email && password dung', async () => {
        const req = await resquest(app)
        .post('/signin')
        .send({email: 'vqthanh1@gmail.com', password: '123456'})
        .type('form');

        assert.equal(req.status, 200);
    });

    it('Khong the Dang nhap khi email chua dang ky', async () => {
        const req = await resquest(app)
        .post('/signin')
        .send({email: 'vqthanh1412489@gmail.com', password: '123456'})
        .type('form');

        assert.equal(req.status, 401);
        assert.equal(req.text, 'Email khong ton tai.');
    });

    it('Khong the Dang nhap khi sai password', async () => {
        const req = await resquest(app)
        .post('/signin')
        .send({email: 'vqthanh1@gmail.com', password: '1234567'})
        .type('form');

        
        assert.equal(req.status, 401);
        assert.equal(req.text, 'Sai password.');
    });
});