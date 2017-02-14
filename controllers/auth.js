'use strict'

const User = require('../models/user')
const service = require('../services')
var graph = require('fbgraph')

function signUpWithFacebook (req, res) {
  // let facebookToken = req.params.facebookToken
  let accessToken = 'EAACEdEose0cBAOjH5HsI34qQrVU4byLzZBj90oUGq5smcUrxrcRIfZBZADdNNtjzZAZBb4ylqrBrt9pPDTGjIJXZABSsk5SCPGnr9bkZB15R5WPJ0Jd1zY9rtRNudZAKEIGHuYankhEhSmcqbKqY5jGiSD7r7gZB7aCBCGgUumVnXmy8oSXdMJcy7BMCLZCjjUY5YZD'
  graph.setAccessToken(accessToken)

  graph.get('me?fields=id,first_name,last_name', function (err, res) {
    if (err) {
      console.log(err)
    }
    console.log(res)
    console.log(res['first_name'] + ' - ' + res.first_name)
  })
}
function signUp (req, res) {
  console.log('POST /api/signUp')
  console.log(req.body)

  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) {
      res.status(500).send({message: `Error trying to create user: ${err}`})
    }
    res.status(200).send({token: service.createToken(user)})
  })
}

function signIn (req, res) {
  let email = req.body.email
  let password = req.body.password

  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return res.status(500).send({message: `Error fetching user info: ${err}`})
    }
    if (!user) {
      return res.status(404).send({message: `User not found`})
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return res.status(500).send({message: `Error fetching user info: ${err}`})
      }
      if (!isMatch) {
        return res.status(500).send({message: `Email or password does not match`})
      }
      console.log(password, isMatch)
      return res.status(200).send({token: service.createToken(user)})
    })
  })
}

module.exports = {
  signUp,
  signIn
}
