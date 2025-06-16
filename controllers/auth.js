const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const Manager = require('../models');

const login = (req, res, next) => {
    Manager.login(req.body)
        .then(result => {
            if (result instanceof Error) {
                return next(createError(result.statusCode, result.message));
            }

            const secretKey = readFileSync('./configurations/private.key');
            const token = jwt.sign(
                {
                    _id: result._id,
                    username: result.username
                },
                secretKey,
                { expiresIn: '1d' } 
            );

            res.status(200).json({
                status: true,
                token: token
            });
        })
        .catch(err => {
            next(createError(500, err.message));
        });
};

const logout = (req, res, next) => {
    const result = Manager.logout();
    res.status(200).json(result);
};

module.exports = {
    login,
    logout
};
