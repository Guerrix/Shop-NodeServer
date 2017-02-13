'use strict'

const express = require('express')
const productConstroller = require('../controllers/product')
const api = express.Router()

api.get('/product', productConstroller.getProducts)
api.get('/product/:productId', productConstroller.getProduct)
api.post('/product', productConstroller.createProduct)
api.put('/product/:productId', productConstroller.updateProduct)
api.delete('/product/:productId', productConstroller.deleteProduct)

module.exports = api
