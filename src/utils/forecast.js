const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/b2cf687aecb08928ee51c77c1433aad0/" + latitude + "," + longitude

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            let temperature = body.currently.temperature
            let precipitation = body.currently.precipIntensity
            let sum = body.daily.data[0].summary

            callback(undefined, `${sum} There is ${temperature} degrees outside, ${precipitation} % chance of rainfall today`)
        }
    })
}

 
module.exports = forecast