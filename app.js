'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const productConstroller = require('./controllers/product')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/product', productConstroller.getProducts)
app.get('/api/product/:productId', productConstroller.getProduct)
app.post('/api/product', productConstroller.createProduct)
app.put('/api/product/:productId', productConstroller.updateProduct)
app.delete('/api/product/:productId', productConstroller.deleteProduct)

module.exports = app
