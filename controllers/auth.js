'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  console.log('POST /api/signUp')
  console.log(req.body)

  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName
  })

  user.save((err) => {
    if (err) {
      res.status(500).send({message: `Error trying to create user: ${err}`})
    }
    res.status(200).send({token: service.createToken(user)})
  })
}

function signIn (req, res) {

}

module.exports = {
  signUp,
  signIn
}
