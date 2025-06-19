const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return next(createError(401, 'توكن غير موجود'));
    }

    const secret = process.env.PRIVATE_KEY;

    try {
        const decode = jwt.verify(token, secret);
        req._user_id = decode._id;
        req._reviewer_id = decode._reviewer_id;
        next();
    } catch (err) {
        return next(createError(401, 'توكن غير صالح'));
    }
};
