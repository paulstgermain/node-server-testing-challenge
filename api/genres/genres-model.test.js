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

/*=============
DB Access Tests
==============*/

describe('genres model', () => {
    describe('get()', () => {
        it('should send correct array of genres', async () => {
            const genres = await Genre.get();
            expect(genres).toHaveLength(5);
        });

        it('sends properly formatted genre objects', async () => {
            const genres = await Genre.get();
            expect(genres[0]).toMatchObject({ genre_id: 1, genre_name: 'horror' })
        })
    });

    describe('insert()', () => {
        it('correctly inserts new genre into db', async () => {
            const genre = { genre_name: 'humor' };

            await Genre.insert(genre);

            expect(await db('genres')).toHaveLength(6);
        })
        it('returns new genre object in correct format', async () => {
            const genre = { genre_name: 'humor' };

            const result = await Genre.insert(genre);

            expect(result).toMatchObject({ genre_id: 6, genre_name: 'humor' })
        })
    });

//     describe('update()', () => {
//         const changes = { genre_name: 'something else' };
        
//         it('can update a user in DB', async () => {
//             await Genre.update(4, changes);
//             const result = await db('genres').where('genre_id', 4).first();

//             expect(result).toMatchObject({ genre_id: 4, genre_name: 'something else' });
//         })

//         it('returns the updated genre', async () => {
//             const result2 = await Genre.update(1, { genre_name: 'scary' });

//             expect(result2).toMatchObject({ genre_id: 1, genre_name: 'scary' });
//         })
//     })
})