const db = require('../../data/db-config');

const get = () => {
    return db('genres');
}

const getById = (id) => {
    return db('genres').where('genre_id', id).first();
}

const insert = async (genre) => {
    const id = await db('genres').insert(genre);
    return getById(id);
}

const update = async (id, changes) => {
    await db('genres').where('genre_id', id).update(changes);

    return getById(id);
}

const remove = async (id) => {
    const result = await getById(id);

    await db('genres').where('genre_id', id).delete();

    return result;
}

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}