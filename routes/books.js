const express = require('express');
const router = express.Router();

/* GET books listing. */
router.get('/', (req, res, next) => {
    req.bookRepository.getBooks().then(books => {
        res.json(books);
    });
});

/* POST add books */
router.post('/', async (req, res, next) => {
    const page = req.body.page;
    if (!page) {
        return next({
            status: 400,
            message: 'page required'
        });
    }

    let raw = await req.bookCrawler.crawMagic(page);
    let status = await req.bookRepository.changeAll(raw);

    // console.log(status);

    return res.json({
        status: 200,
        message: 'OK',
    });
});

module.exports = router;
