module.exports = {
    host: process.env['DOMAIN_CRAW'] || 'http://books.toscrape.com',
    port: process.env['PORT'] || 8000,
    env: process.env['ENV'] || 'development',
    mysqlHost: process.env['MYSQL_HOST'] || 'localhost',
    mysqlPort: process.env['MYSQL_PORT'] || 3307,
    mysqlUser: process.env['MYSQL_USER'] || 'crawler',
    mysqlPassword: process.env['MYSQL_PASSWORD'] || 'crawler',
    mysqlDatabase: process.env['MYSQL_DATABASE'] || 'crawler'
};
