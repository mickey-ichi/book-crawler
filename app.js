require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config');
const db = require('./db');

const BookCrawlerRepository = require('./src/BookCrawlerRepository');
const BookCrawler = require('./src/BookCrawler');

const indexRouter = require('./routes/index');
const bookCrawlerRouter = require('./routes/book-crawler');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    req.bookCrawlerRepository = new BookCrawlerRepository(db);
    req.bookCrawler = new BookCrawler();
    next();
});

app.use('/', indexRouter);
app.use('/api/book-crawler', bookCrawlerRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = config.env === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    if(err.api){
        return res.json({
            status: err.status,
            message: err.message,
        });
    }
    return res.render('error');

});

module.exports = app;
