class BookCrawlerRepository {
    constructor(db) {
        this.db = db;
    }

    /**
     * UPDATE BOOKS
     * @param books
     * @returns {Promise}
     */
    changeBooks(books = []) {
        let sql = `
            INSERT INTO books (name, upc_code, category, image_src, price, star, status) VALUES ?
            ON DUPLICATE KEY UPDATE
            name = VALUES(name), category = VALUES(category),
            image_src = VALUES(image_src), price = VALUES(price),
            star = VALUES(star), status = VALUES(status)
        `;

        let records = [];

        books.forEach(item => {
            records.push([item.name, item.upc_code, item.category, item.image_src, item.price, item.star, item.status])
        });

        return new Promise((resolve, reject) => {
            this.db.query(sql, [records], function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        })
    }

    /**
     * UPDATE CATEGORIES
     * @param categories
     * @returns {Promise}
     */
    changeCategories(categories = []) {
        let sql = `
            INSERT INTO categories (name, value) VALUES ?
            ON DUPLICATE KEY UPDATE
            name = VALUES(name)
        `;

        let records = [];

        categories.forEach(item => {
            records.push([item.name, item.value])
        });

        return new Promise((resolve, reject) => {
            this.db.query(sql, [records], function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        })
    }

    /**
     * GET ALL BOOK
     * @returns {Promise}
     */
    getBooks() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM books', function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    /**
     * GET ALL CATEGORY
     * @returns {Promise}
     */
    getCategories() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM categories', function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    /**
     * GET ALL BOOK AND CATEGORY
     * @returns {Promise}
     */
    async getAll() {
        let all = await Promise.all([this.getBooks(), this.getCategories()]);
        return {
            books: all[0],
            categories: all[1],
        };
    }

    /**
     * UPDATE BOOKS AND CATEGORIES
     * @returns {Promise}
     */
    async changeAll(params) {
        return await Promise.all([this.changeBooks(params.books), this.changeCategories(params.categories)]);
    }
}

module.exports = BookCrawlerRepository;
