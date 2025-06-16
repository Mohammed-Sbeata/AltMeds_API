const { dbConnection } = require('../configurations');
const { loginValidator } = require('../validators');
const { compareSync } = require('bcryptjs');

class Manager {
    static login(loginData) {
        return new Promise((resolve, reject) => {
            // تحقق من صحة البيانات
            const validation = loginValidator.validate(loginData);
            if (validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return resolve(error);
            }

            dbConnection('manager', async (collection) => {
                try {
                    const manager = await collection.findOne({ username: loginData.username });

                    if (!manager || !compareSync(loginData.password, manager.password)) {
                        const error = new Error('Invalid username or password');
                        error.statusCode = 401;
                        return resolve(error);
                    }

                    resolve(manager);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    static logout() {
        return {
            status: true,
            message: 'Logout successful. Please delete token on client side.'
        };
    }
}

module.exports = Manager;
