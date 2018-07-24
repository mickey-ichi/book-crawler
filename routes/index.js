const express = require('express');
const router = express.Router();
const BookCrawler = require('../src/BookCrawler');

/* GET home page. */
router.get('/', async (req, res, next) => {
    let bookCrawler = new BookCrawler();
    bookCrawler.crawMagic();
  res.render('index', { title: 'Book Crawler' });
});

module.exports = router;
