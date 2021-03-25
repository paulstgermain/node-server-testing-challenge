const express = require('express');

const genreRouter = require('./genres/genres-router');

const server = express();

server.use(express.json());

server.use('/api/genres', genreRouter);

server.get('/', (req, res) => {
    res.json({ message: 'It works!' })
})

module.exports = server;