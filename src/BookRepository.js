class BookRepository {
    constructor(db) {
        this.db = db;
    }

    changeBooks(books = []) {
        let sql = 'INSERT INTO books (name, category, image_src, price, star, status) VALUES ?';

        let records = [];

        books.forEach(item => {
            records.push([item.name, item.category, item.image_src, item.price, item.star, item.status])
        });

        return new Promise((resolve, reject) => {
            this.db.query(sql, [records], function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        })
    }

    changeCategories(categories = []) {
        let sql = 'INSERT INTO categories (name) VALUES ?';

        let records = [];

        categories.forEach(item => {
            records.push([item.name])
        });

        return new Promise((resolve, reject) => {
            this.db.query(sql, [records], function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        })
    }

    getBooks() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM `books`', function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    getCategories() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM `categories`', function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    async getAll() {
        let all = await Promise.all([this.getBooks(), this.getCategories()]);
        return {
            books: all[0],
            categories: all[1],
        };
    }

    async changeAll(params) {
        return await Promise.all([this.changeBooks(params.books), this.changeCategories(params.categories)]);
    }
}

module.exports = BookRepository;
