const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

// Registration
exports.register = async (req, res) => {
    try {
        const { username, email, firstname, lastname, password } = req.body;

        // Basic validation
        if (!username || !email || !firstname || !lastname || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 10;
        const hashpassword = await bcrypt.hash(password, parseInt(saltRounds));

        await prisma.user.create({
            data: { username, email, firstname, lastname, password: hashpassword }
        });

        res.json({ message: "Registration successful" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error, please try again" });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findFirst({ where: { username } });

        if (!user || !user.enabled) {
            return res.status(400).json({ message: "User not found or not enabled" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const payload = { id: user.id, username: user.username, email: user.email, role: user.role };

        if (!process.env.SECRET) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }

        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Server error" });
            }
            res.json({ payload, token });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error, please try again" });
    }
};

// Current user
exports.currentUser = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: { id: true, firstname: true, lastname: true, email: true, role: true }
        });

        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error, please try again" });
    }
};
