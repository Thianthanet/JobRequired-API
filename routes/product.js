const express = require('express')
const router = express.Router()

const { createProduct, updateProduct, readProduct, deleteProduct, getProductAll, countProduct } = require('../controllers/product')
const { authCheck, adminCheck } = require('../middleware/authCheck')

router.post('/create', authCheck, createProduct)
router.put('/update/:id', authCheck, updateProduct)
router.get('/read/:id', authCheck, readProduct)
router.delete('/delete/:id', authCheck, deleteProduct)
router.get('/readAll', authCheck, getProductAll)
router.get('/countProduct', authCheck, adminCheck, countProduct)

module.exports = router