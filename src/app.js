const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static files path
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Sunil'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Sunil'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helptext: 'some helpful text',
    name: 'Sunil'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error:'You must provide address'
    })
  }

  geocode(req.query.address, (err, { lat, long, location } = {}) => {
    if (err) {
      return res.send({
        err
      })
    }
    forecast(lat, long, (err, forecastData) => {
      if (err) {
        return res.send({
          err
        })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sunil',
    errorMessage: '404,Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sunil',
    errorMessage: '404, Page not found'
  })
})

app.listen(3000,() => {
  console.log('Server running on port 3000')
})