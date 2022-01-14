const express = require('express')

const app = express()


app.use('/favicon.ico', (req, res, next) => {
    next()
  })  

app.use('/users', (req, res, next) => {
    console.log('middleware one');  
    res.send('<h1>User list>/h1>')
})

app.use('/', (req, res, next) => {
    console.log('middleware two');
    res.send('<h1>ALL YOUR BASE ARE BELONG TO US</h1>')
})

app.listen(2000)