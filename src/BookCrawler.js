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
            let $booksEl = $('article[class="product_pod"]', 'section');
            $booksEl.each((i, bookHtml) => {
                let $book = cheerio.load(bookHtml);
                linksBook.push(`${this.host}/catalogue/${$book('a', '.image_container').attr('href')}`)
            });
            let $categoriesEl = $('ul li', '.nav-list');
            $categoriesEl.each((i, category) => {
                let $category = cheerio.load(category);
                let name = $category('a').text().trim();
                let value = $category('a').attr('href').replace('/index.html', '').split('/').pop();
                categories.push({
                    name: name,
                    value: value
                });
            });
            return {linksBook, categories};
        });
        let booksPromise = [];
        response.linksBook.forEach(link => {
            booksPromise.push(this.crawBookDetail(link));
        });
        let books = await Promise.all(booksPromise);
        return {
            books: books,
            categories: response.categories,
        };
    }

    /**
     * Link book detail
     * @param link
     */
    crawBookDetail(link) {
        return axios.get(link).then(response => {
            const $ = cheerio.load(response.data);
            return {
                name: $('h1', '.product_main').text(),
                upc_code: $('td', '.table-striped').first().text(),
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
