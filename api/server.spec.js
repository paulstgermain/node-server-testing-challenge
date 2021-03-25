const request = require('supertest');

const server = require('./server.js');
const db = require('../data/db-config'); // eslint-disable-line

const User = require('./users/users-model');

// beforeAll(async () => {
//     await db.migrate.rollback();
//     await db.migrate.latest();
// })

// beforeEach(async () => {
//     await db('users').truncate();
//     await db('genres').truncate();
//     await db('books').truncate();
//     await db.seed.run();
// })

// afterAll(async () => {
//     await db.destroy();
// })

/*===================
Server Sanity Tests
=====================*/

describe('server.js', () => {
    describe('index route', () => {
        it('returns an OK status from index route', async () => {
            const expectStatus = 200;

            const response = await request(server).get('/');

            expect(response.status).toEqual(expectStatus);
        });

        it('returns a JSON object from index route', async () => {
            const expectBody = { message: 'It works!' };

            const response = await request(server).get('/');

            expect(response.body).toEqual(expectBody);
        })

        it('returns a JSON object from index route', async () => {
            const response = await request(server).get('/');

            expect(response.type).toEqual('application/json');
        });
    });
});

