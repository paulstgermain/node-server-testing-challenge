const request = require('supertest');

const server = require('./server.js');
const db = require('../data/db-config'); // eslint-disable-line

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeAll(async () => {
    await db('genres').truncate();
    await db.seed.run();
});
afterAll(async () => {
    await db.destroy();
});

it('process.env.DB_ENV must be "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
})

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

/*===================
Genre Route Tests
=====================*/

describe('/api/genre', () => {
    describe('[GET]', () => {
        it('returns the correct array of genres', async () => {
            const response = await request(server).get('/api/genres');

            expect(response.body).toHaveLength(5);
        })

        it('returns an OK status code', async () => {
            const response = await request(server).get('/api/genres');
            
            expect(response.status).toBe(200);
        })
    })

    describe('[POST]', () => {
        let response;
        beforeAll(async () => {
            response = await request(server).post('/api/genres').send({ genre_name: 'slice of life' });
        })

        it('returns the newly added genre', async () => {
            const expected = { genre_id: 6, genre_name: 'slice of life' };

            expect(response.body).toMatchObject(expected);
        })

        it('returns a created status code', async () => {
            expect(response.status).toBe(201);
        })
    })
})