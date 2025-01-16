const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        //request parameter
        const { username, email, firstname, lastname, password } = req.body

        if (!username || !email || !firstname || !lastname || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })

        if (existingUser) {
            return res.status(409).json({ message: "Email Already exists" })
        }

        console.log('req.body',req.body)
        //hashpassword
        const hashpassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                username: username,
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashpassword
            }
        })
        res.json({ message: "Register Successed" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if (!user || !user.enabled) {
            return res.status(400).json({ message: "User not found or not enabled" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Password Invalid!!" })
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }

        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" })
            }
            res.json({ payload, token })
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.currentUser = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                role: true
            }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}