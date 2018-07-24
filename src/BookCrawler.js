const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');

class BookCrawler {
    constructor() {
        this.host = config.host;
    }

    /**
     * Page number
     * @param page
     */
    async crawMagic(page = 1) {
        let response = await axios.get(`${this.host}/catalogue/page-${page}.html`).then(response => {
            const $ = cheerio.load(response.data);
            let linksBook = [];
            let categories = [];
            let $books = $('article[class="product_pod"]', 'section');
            $books.each((i, bookHtml) => {
                let $book = cheerio.load(bookHtml);
                linksBook.push(`${this.host}/catalogue/${$book('a', '.image_container').attr('href')}`)
            });
            return {linksBook, categories};
        });

        let booksPromise = [];

        response.linksBook.forEach(link => {
            booksPromise.push(this.crawBookDetail(link));
        });
        let aad = await Promise.all(booksPromise);
        console.log(aad);
        return response;
    }

    /**
     * Link book detail
     * @param link
     */
    crawBookDetail(link) {
        axios.get(link).then(response => {
            const $ = cheerio.load(response.data);
            return {
                name: $('h1', '.product_main').text(),
                category: $('li[class="active"]', '.breadcrumb').prev().text().trim(),
                image_src: `${this.host}/${$('img', '.active').attr('src').replace('../../', '')}`,
                price: parseFloat($('p[class="price_color"]').text().replace('£', '')),
                star: BookCrawler.convertStar($('.star-rating').attr('class').replace('star-rating ', '')),
                status: !!$('p[class="instock availability"]', '.product_main').text()
            };
        }).catch(error => {
            console.log(error);
        });
    }

    /**
     *
     * @param star
     * @returns {number}
     */
    static convertStar(star) {
        switch (star.toLowerCase()) {
            case 'one':
                return 1;
            case 'two':
                return 2;
            case 'three':
                return 3;
            case 'four':
                return 4;
            case 'five':
                return 5;
            default:
                return 0;
        }
    };


}

module.exports = BookCrawler;
