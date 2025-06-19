require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const { returnJson } = require('./my_modules/json_response');
const middleware = require('./middlewares');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

global.returnJson = returnJson;

const app = express();

// إضافة ميدلوير لتحليل الكوكيز
app.use(cookieParser());

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

/**
 * Middlewares
 */
middleware.global(app);

/**
 * Routes
 */
routes(app);

// معالجة الأخطاء: صفحة غير موجودة (404)
app.use((req, res, next) => {
    next(createError(404));
});

// معالج الأخطاء العام مع ضبط statusCode افتراضي
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.statusCode || 500).json({
        status: {
            status: false,
            message: error.message || 'Internal Server Error'
        }
    });
});

// تشغيل السيرفر بعد ضبط كل شيء
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

module.exports = app;
