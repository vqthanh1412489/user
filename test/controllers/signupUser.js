const assert = require('assert');
const resquest = require('supertest');

const User = require('../../src/user');
const app = require('../../src/index');
describe.only('/signup Router', () => {
    it('Co the Dang ky User voi thong tin hop le', async () => {
        const req = await resquest(app)
        .post('/signup')
        .send({email: 'vqthanh1412489@gmail.com', password: '123456', username: 'vqthanh'})
        .type('form');

        assert.equal(req.status, 200);
    });

    it('Khong the Dang ky khi thieu Username', async () => {
        const req = await resquest(app)
        .post('/signup')
        .send({email: 'vqthanh1412489@gmail.com', password: '123456'})
        .type('form');

        assert.equal(req.status, 401);
    });
});