'use strict'

const mongoose = require('mongoose')
const app = require('./app')
mongoose.Promise = require('bluebird')

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error al conectar base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos exitosa....')
  app.listen(3000, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
