const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')

exports.userAll = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                firstname: true,
                lastname: true,
                role: true,
                enabled: true,
                address: true,
                updatedAt: true
            }
        })
        res.json(users)
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.changeRole = async (req, res) => {
    try {
        const { id, role } = req.body
        console.log(id, role)
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { role: role }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const { id, enabled } = req.body
        console.log(id, enabled)
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { enabled: enabled }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id, username, email, firstname, lastname, password } = req.body
        console.log(id, username, email, firstname, lastname, password)
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                username: username,
                email: email,
                firstname: firstname,
                lastname: lastname,
                password: hashedPassword,
            }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await prisma.user.delete({
            where: { id: Number(id) }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.userResume = async (req, res) => {
    try {
        const { id } = req.params
        const user = await prisma.product.findMany({
            where: { userId: Number(id) },
            select: {
                id: true,
                title: true,
                phone: true,
                description: true,
                skill: true,
                experience: true,
                userId: true
            }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.userData = async (req, res) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                firstname: true,
                lastname: true,
                email: true,
                address: true
            }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.resumeId = async (req, res) => {
    try {
        const { id } = req.params
        const user = await prisma.product.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                title: true,
                phone: true,
                description: true,
                skill: true,
                experience: true,
                userId: true,
                address: true
            }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.getUserId = async (req, res) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                username: true,
                firstname: true,
                lastname: true,
                email: true,
                password: true
            }
        })
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Errror" })
    }
}

exports.countUser = async (req, res) => {
    try {
        const user = await prisma.user.count()
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}