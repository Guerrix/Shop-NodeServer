module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB,
  SECRET_TOKEN: process.env.JWTSECRET,
  demo_user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGEyNGMyZjMwNGM5MDUxYmNkNTNkMjgiLCJpYXQiOjE0ODcwMzEzNDMsImV4cCI6MTQ4ODI0MDk0M30.6A-pn11zhtcG4-TBSj7LC_DJT2FOpHbm4bdB9jppUqI'
}
