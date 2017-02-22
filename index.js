'use strict'

require('dotenv').config({path: './dotenv.env'})
const mongoose = require('mongoose')
const app = require('./app')
mongoose.Promise = require('bluebird')

const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos exitosa....')
  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})
