const db = require('../../data/db-config'); // eslint-disable-line

const Book = require('./books-model');

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

describe('books model', () => {
    describe('get()', () => {
        it('should send correct array of books', async () => {
            const books = await Book.get();

            expect(books).toHaveLength(3);
        });

        it('should send properly formatted book objects', async () => {
            const books = await Book.get();

            expect(books[0]).toMatchObject({ book_id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'fantasy', pages: 309, hasRead: 1, postedBy: 'AgentCooper' })
        })
    });

    describe('insert()', () => {
        it('correctly inserts a new book into DB', async () => {
            const book = { title: 'The Shining', author: 'Stephen King', genre_id: 1, user_id: 1 };
            await Book.insert(book);

            expect(await db('books')).toHaveLength(4);
        })

        it('returns the newly added book', async () => {
            const book = { title: 'The Shining', author: 'Stephen King', genre_id: 1, user_id: 1 };
            const result = await Book.insert(book);

            expect(result).toMatchObject({ book_id: 4, title: 'The Shining', author: 'Stephen King', genre: 'horror', pages: null, hasRead: 0, postedBy: 'Bob' })
        })
    });

    describe('update()', () => {
        const changes = { title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', genre_id: 3, pages: 734, hasRead: true, user_id: 2 }

        it('correctly updates a book in the DB', async () => {
            await Book.update(1, changes);

            const updates = await db('books as b')
            .leftJoin('genres as g', 'b.genre_id', 'g.genre_id')
            .leftJoin('users as u', 'b.user_id', 'u.user_id')
            .select('b.book_id', 'b.title', 'b.author', 'g.genre_name as genre', 'b.pages', 'b.hasRead', 'u.username as postedBy')
            .where('b.book_id', 1)
            .first();

            const expected = { book_id: 1, title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', genre: 'fantasy', pages: 734, hasRead: 1, postedBy: 'AgentCooper' }

            expect(updates).toMatchObject(expected)
        })

        it('returns the updated book', async () => {
            const result = await Book.update(1, changes);

            const expected = { book_id: 1, title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', genre: 'fantasy', pages: 734, hasRead: 1, postedBy: 'AgentCooper' }

            expect(result).toMatchObject(expected);
        })
    })
})