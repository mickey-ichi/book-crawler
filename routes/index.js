const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    req.bookRepository.getAll().then(({books, categories}) => {
        res.render('index', {books: books, categories: categories});
    });
});

module.exports = router;
