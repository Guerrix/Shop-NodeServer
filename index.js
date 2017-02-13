'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const app = express()
const port = process.env.PORT || 3000
const productConstroller = require('/controllers/product')

// Midleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/product', productConstroller.getProducts)
app.get('/api/product/:productId', productConstroller.getProduct)
app.post('/api/product', productConstroller.createProduct)
app.put('/api/product/:productId', productConstroller.updateProduct)
app.delete('/api/product/:productId', productConstroller.deleteProduct)

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error al conectar base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos exitosa....')
  app.listen(3000, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
