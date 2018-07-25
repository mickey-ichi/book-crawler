const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', async (req, res, next) => {

    let {books, categories} = await req.bookCrawlerRepository.getAll();

    res.render('index', {title: 'Book Crawler', books, categories});
});

module.exports = router;
