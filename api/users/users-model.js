const db = require('../../data/db-config');

const get = () => {
    return db('users');
};

const getById = (id) => {
    return db('users').where('user_id', id).first();
}

const insert = async (user) => {
    const id = await db('users').insert(user);

    return getById(id);
}

const update = async (id, changes) => {
    await db('users').where('user_id', id).update(changes);

    return getById(id);
}

module.exports = {
    get,
    getById,
    insert,
    update
};