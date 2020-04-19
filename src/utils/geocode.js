const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VuaWxhYXlkaSIsImEiOiJjazh3cGtkbW8wMmQ0M2ZzN3hhcXV2aHprIn0.WPENQZT1s-YD8wZrScBp8w&limit=1';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable find location please try another search!', undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].geometry.coordinates[1],
        long: body.features[0].geometry.coordinates[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode