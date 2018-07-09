const path = require('path')
const express = require('express')
const server = express()
const userRoute = require('./routes/userRoute')

server.use(express.static(path.join(__dirname, '../public')))
server.use('/user', userRoute)

// Catch All: Show 404 at not supported pages
server.get('*', function (req, res) {
  res.send('<h1>Error 404</h1><p>Page is not available</p>', 404)
})

module.exports = server
