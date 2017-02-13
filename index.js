'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const Product = require('./models/products')

const app = express()
const port = process.env.PORT || 3000

// Midleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(500).send({message: `Error trying to fetch products:``${err}`})
    } else if (!products) {
      return res.status(404).send({message: `Products not found`})
    }
    res.status(200).send({products})
  })
})

app.get('/api/products/:productId', (req, res) => {
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.status(500).send({message: `Error trying to fetch product: ${err}`})
    } else if (!product) {
      return res.status(404).send({message: `Product ${productId} not found`})
    }

    res.status(200).send({product})
  })
})

app.post('/api/products', (req, res) => {
  console.log('POST /api/products')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) {
      res.status(500).send({message: `Error trying to salve object in to data base: ${err}`})
    }
    res.status(200).send({product: productStored})
  })
})

app.put('/api/products/:productId', (req, res) => {})

app.delete('/api/products/:productId', (req, res) => {})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error al conectar base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos exitosa....')
  app.listen(3000, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
