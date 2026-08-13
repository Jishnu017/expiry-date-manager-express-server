const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');

const SALT_ROUNDS = 10;

const authService = {
    register: async ({ name, email, password }) => {
        const existingUser = await userDao.findByEmail(email);
        if (existingUser) {
            const error = new Error('An account with this email already exists');
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await userDao.createUser({
            name,
            email,
            password: hashedPassword,
        });

        // Return sanitized user — never expose password
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    },

    login: async ({ email, password }) => {
        const user = await userDao.findByEmail(email);

        const isPasswordMatched = user
            ? await bcrypt.compare(password, user.password)
            : false;

        if (!user || !isPasswordMatched) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const sanitizedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };

        return { token, user: sanitizedUser };
    },
};

module.exports = authService;
