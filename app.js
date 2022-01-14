const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views') // optional, it's already the default

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Body parser sert à traiter les données entrante pour chaque middleware
app.use(bodyParser.urlencoded({ extended: false }))
// express.static permet d'établir un path pour un public folder
app.use(express.static(path.join(__dirname, 'public')))

// the browser sends a request to find the favicon, and it messes up the app.
// This middleware fixes it.
app.use('/favicon.ico', (req, res, next) => {
  res.end()
})

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' })
})

app.listen(3000)
