'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = Schema({
  email: {type: String, unique: true, lowercase: true},
  displayName: String,
  avatar: String,
  password: {type: String }, //select: false
  signupDate: {type: Date, default: Date.now()},
  lastLoging: Date
})

UserSchema.pre('save', function (next) {
  let user = this
  // if (!user.isModified('password')) {
  //   return next()
  // }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next()
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        next()
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

UserSchema.methods.gravatar = function () {
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=200&d=mystery'
  }

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=mystery`
}

module.exports = mongoose.model('User', UserSchema)
