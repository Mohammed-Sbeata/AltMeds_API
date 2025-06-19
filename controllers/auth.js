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
            httpOnly: true,     // لا يمكن الوصول من جافاسكريبت
            secure: false,      // في بيئة التطوير خليها false، بالإنتاج خليها true مع HTTPS
            maxAge: 2 * 60 * 60 * 1000, // ساعتين (مطابقة لصلاحية التوكن)
            sameSite: 'Strict'  // يقي من هجمات CSRF
        });

        return res.json({
            status: true,
            message: "تم تسجيل الدخول بنجاح",
            token
        });
    }

    return res.status(404).json({ status: false, message: "اسم المستخدم او كلمة المرور غير صحيحة" })
};

const logout = (req, res, next) => {
    res.clearCookie('token');
    return res.json({
        status: true,
        message: "تم تسجيل الخروج بنجاح"
    });
};

module.exports = {
    login,
    logout
};
