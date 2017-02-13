'use strict'
const Product = require('../models/product')

function getProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.status(500).send({message: `Error trying to fetch product: ${err}`})
    } else if (!product) {
      return res.status(404).send({message: `Product ${productId} not found`})
    }

    res.status(200).send({product})
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(500).send({message: `Error trying to fetch products:${err}`})
    } else if (!products) {
      return res.status(404).send({message: `Products not found`})
    }
    res.status(200).send({products})
  })
}
function updateProduct (req, res) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdate) => {
    if (err) {
      return res.status(500).send({message: `Error trying to update object in  database: ${err}`})
    }
    res.status(200).send({product: productUpdate})
  })
}

function createProduct (req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) {
      res.status(500).send({message: `Error trying to salve object into database: ${err}`})
    }
    res.status(200).send({product: productStored})
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.status(500).send({message: `Error trying to delete object in  database: ${err}`})
    }
    product.remove(err => {
      if (err) {
        return res.status(500).send({message: `Error trying to delete object in  database: ${err}`})
      }
      res.status(200).send({message: `Object deleted`})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct
}
