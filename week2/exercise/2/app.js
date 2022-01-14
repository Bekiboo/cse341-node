const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/favicon.ico', (req, res, next) => {
  res.end()
})

app.get('/users', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'users.html'))
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.listen(2000)
