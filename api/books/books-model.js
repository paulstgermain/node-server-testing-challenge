const db = require('../../data/db-config');

const get = async () => {
    return await db('books as b')
        .leftJoin('genres as g', 'b.genre_id', 'g.genre_id')
        .leftJoin('users as u', 'b.user_id', 'u.user_id')
        .select('b.book_id', 'b.title', 'b.author', 'g.genre_name as genre', 'b.pages', 'b.hasRead', 'u.username as postedBy');
}

const getById = (id) => {
    return db('books as b')
    .leftJoin('genres as g', 'b.genre_id', 'g.genre_id')
    .leftJoin('users as u', 'b.user_id', 'u.user_id')
    .select('b.book_id', 'b.title', 'b.author', 'g.genre_name as genre', 'b.pages', 'b.hasRead', 'u.username as postedBy')
    .where('b.book_id', id)
    .first();
}

const insert = async (book) => {
    const id = await db('books').insert(book);
    return getById(id);
}

const update = async (id, changes) => {
    await db('books').where('book_id', id).update(changes);

    return getById(id);
}

module.exports = {
    get,
    getById,
    insert,
    update
}