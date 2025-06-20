require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const middleware = require('./middlewares');
const routes = require('./routes');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser());

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

middleware.global(app);

routes(app);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.statusCode || 500).json({
        status: {
            status: false,
            message: error.message || 'Internal Server Error'
        }
    });
});


module.exports = app;
