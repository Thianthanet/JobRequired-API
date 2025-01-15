const prisma = require('../config/prisma')

exports.createProduct = async (req, res) => {
    try {
        const { title, phone, description, skill, experience, userId, address } = req.body
        console.log(title, phone, description, skill, experience)
        const resume = await prisma.product.create({
            data: {
                title: title,
                phone: phone,
                description: description,
                skill: skill,
                experience: experience,
                userId: userId,
                address: address
            }
        })
        res.send(resume)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id, title, phone, description, skill, experience, address } = req.body
        console.log(id, title, phone, description, skill, experience)
        const resume = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                title: title,
                phone: phone,
                description: description,
                skill: skill,
                experience: Number(experience),
                address: address
            }
        })
        res.send(resume)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const resume = await prisma.product.delete({
            where: { id: Number(id) }
        })
        res.send(resume)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.readProduct = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" })
        }
        const resume = await prisma.product.findUnique({
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

        if (!resume) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(resume)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.getProductAll = async (req, res) => {
    try {
        const getProduct = await prisma.product.findMany({
            select: {
                id: true,
                title: true,
                phone: true,
                description: true,
                skill: true,
                experience: true,
                address: true
            }
        })
        console.log("getProduct",getProduct)
        res.json(getProduct)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.countProduct = async (req, res) => {
    try {
        const product = await prisma.product.count()
        res.json(product)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}