const db = require('../../data/db-config'); // eslint-disable-line

const User = require('./users-model');

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

/*=============
DB Access Tests
==============*/

describe('users model', () => {
    describe('get()', () => {
        it('should send array of all users', async () => {
            const users = await User.get();

            expect(users).toHaveLength(3);
            expect(users[0].username).toEqual('Bob');
        });

        it('should send properly formatted user objects', async () => {
            const users = await User.get();

            expect(users[0]).toMatchObject({ user_id: 1, username: 'Bob', email: 'blacklodge@twinpeaks.com', password: 'blacklodge' });
        })
    });

    describe('insert()', () => {
        // Write two tests
        it('correctly inserts new user into db', async () => {
            const user = { username: 'Denise', email: 'proudchangling@twinpeaks.com', password: 'proudchangling' };
            await User.insert(user);

            expect(await db('users')).toHaveLength(4);
        });

        it('returns the newly created user', async () => {
            const user = { username: 'Denise', email: 'proudchangling@twinpeaks.com', password: 'proudchangling' };
            const result = await User.insert(user);

            expect(result).toMatchObject({ user_id: 4, username: 'Denise', email: 'proudchangling@twinpeaks.com', password: 'proudchangling' })
        })
    });

    describe('update()', () => {
        const changes = { username: 'AgentCoopz', email: 'tw4ever@twinpeaks', password: 'tw4ever' };

        it('correctly updates a user in the DB', async () => {
            await User.update(2, changes);

            expect(await db('users').where('user_id', 2).first())
            .toMatchObject({ user_id: 2, username: 'AgentCoopz', email: 'tw4ever@twinpeaks', password: 'tw4ever' });
        })
        it('returns the updated user', async () => {
            const result = await User.update(2, changes);

            expect(result).toMatchObject({ user_id: 2, username: 'AgentCoopz', email: 'tw4ever@twinpeaks', password: 'tw4ever' })
        })
    })
})