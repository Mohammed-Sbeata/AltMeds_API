const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY

const login = (req, res, next) => {
    const { username, password } = req.body;

    if (username === "manager" && password === "manager123") {
        const payload = {
            _id: 'fixed-manager-id',
            role: 'admin'
        };

        const token = jwt.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: '2h' });

        res.cookie('token', token, {
            httpOnly: true,     
            secure: false,      
            maxAge: 2 * 60 * 60 * 1000, 
            sameSite: 'Strict'  
        });

        return res.json({
            status: true,
            message: "Login Successfully...",
            token
        });
    }

    return res.status(404).json({ status: false, message: 'UserName or Password Not Corrected ...' })
};

const logout = (req, res, next) => {
    res.clearCookie('token');
    return res.json({
        status: true,
        message: "Logout  Successfully..."
    });
};

module.exports = {
    login,
    logout
};
