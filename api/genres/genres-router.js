const express = require('express');

const Genre = require('./genres-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Genre.get()
        .then(genres => {
            res.json(genres);
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong.' })
        })
})

router.post('/', (req, res, next) => {
    Genre.insert(req.body)
        .then(newGenre => {
            res.status(201).json(newGenre);
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong.' })
        })
})

module.exports = router;