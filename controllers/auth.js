'use strict'

const User = require('../models/user')
const service = require('../services')
var graph = require('fbgraph')

function signUpWithFacebook (req, res) {
  let accessToken = req.params.facebookToken
  console.log(accessToken)
  graph.setAccessToken(accessToken)

  graph.get('me?fields=id,first_name,last_name,email,name', function (err, fRes) {
    if (err) {
      console.log(err.message)
      console.log(err)
      return res.status(500).send({message: `Error trying to get facebook info: ${err.message}`})
    }

    User.findOne({'email': fRes.email}, function (err, user) {
      if (err) {
        res.status(500).send({message: `Error fetching user info: ${err}`})
      } else if (!user) {
        const user = new User({
          email: fRes.email,
          displayName: fRes.name,
          facebookId: fRes.id,
          avatar: `https://graph.facebook.com/${fRes.id}/picture?type=large`
        })

        user.save((err) => {
          if (err) {
            res.status(500).send({message: `Error trying to create user: ${err}`})
          }
          res.send({token: service.createToken(user)})
        })
      } else {
        user.facebookId = fRes.id
        user.avatar = `https://graph.facebook.com/${fRes.id}/picture?type=large`
        user.save((err) => {
          if (err) {
            res.status(500).send({message: `Error trying to update user: ${err}`})
          }
          res.send({token: service.createToken(user)})
        })
      }
    })
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
  user.avatar = user.gravatar()

  user.save((err) => {
    if (err) {
      res.status(500).send({message: `Error trying to create user: ${err}`})
    }
    res.send({token: service.createToken(user)})
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
      return res.send({token: service.createToken(user)})
    })
  })
}

module.exports = {
  signUp,
  signIn,
  signUpWithFacebook
}
