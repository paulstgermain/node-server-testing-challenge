const db = require('../../data/db-config'); // eslint-disable-line

const Genre = require('./genres-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async () => {
    await db('users').truncate();
    await db.seed.run();
})

afterAll(async () => {
    await db.destroy();
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