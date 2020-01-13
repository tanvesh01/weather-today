const geocode = require("../utils/geocode")
const forecast = require("../utils/forecast")

const address = process.argv[2]

if (!address) {
    console.log("Please provide a location!")
} else {

    geocode(address, (error, { latitude, longitude, place }) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(place)
            console.log('forecastData', forecastData)
        })

    })

}
