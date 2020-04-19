const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=f9808509c01ccc340eb76a9a841601f4&query=' + lat + ',' + long;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Invalid request', undefined)
    } else {
      const current = body.current
      callback(undefined, current.weather_descriptions[0] + '. it is currently ' + current.temperature + ' it feels like ' + current.feelslike)
    }
  })
}

module.exports = forecast