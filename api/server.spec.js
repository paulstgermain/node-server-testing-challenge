const request = require('supertest');

const server = require('./server.js');
const db = require('../data/db-config'); // eslint-disable-line

const User = require('./users/users-model');

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

/*=============
DB Access Tests
==============*/

describe('users model', () => {
    describe('get()', () => {
        it('should send correct array of users', async () => {
            const users = await User.get();

            expect(users).toHaveLength(3);
            expect(users[0].username).toEqual('Bob');
        });
    });

    describe('insert()', () => {
        // Write two tests
    });

    describe('update()', () => {
        // Write two tests
    })
})

describe('genres model', () => {
    describe('get()', () => {
        it('should send correct array of genres', async () => {

        });
    });

    describe('insert()', () => {
        // Write two tests
    });

    describe('update()', () => {
        // Write two tests
    })
})

describe('books model', () => {
    describe('get()', () => {
        it('should send correct array of books', async () => {

        });
    });

    describe('insert()', () => {
        // Write two tests
    });

    describe('update()', () => {
        // Write two tests
    })
})