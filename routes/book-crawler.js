const express = require('express');
const router = express.Router();

/* POST change all */
router.post('/', async (req, res, next) => {
    const page = req.body.page;
    if (!page) {
        return next({
            status: 400,
            message: 'page required',
            api: true
        });
    }

    let raw = await req.bookCrawler.crawMagic(page);
    await req.bookCrawlerRepository.changeAll(raw);
    return res.json({
        status: 200,
        message: 'OK',
    });


});

module.exports = router;
