const db = require('../../data/db-config');

const get = () => {
    return db('users');
};

module.exports = {
    get
};