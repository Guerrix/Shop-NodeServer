'use strict'

const express = require('express')
const productConstroller = require('../controllers/product')
const userConstroller = require('../controllers/auth')
const api = express.Router()
const auth = require('../middlewares/auth')
api.post('/facebooksignUp/:facebookToken', userConstroller.signUpWithFacebook)
api.post('/signUp', userConstroller.signUp)
api.post('/signIn', userConstroller.signIn)

api.get('/products', auth.isAuth, productConstroller.getProducts)
api.get('/products/:productId', auth.isAuth, productConstroller.getProduct)
api.post('/product', auth.isAuth, productConstroller.createProduct)
api.put('/product/:productId', auth.isAuth, productConstroller.updateProduct)
api.delete('/product/:productId', auth.isAuth, productConstroller.deleteProduct)

module.exports = api
