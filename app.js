const express = require("express")
const ejs = require("ejs")

const geocode = require("./src/utils/geocode")
const forecast = require("./src/utils/forecast")

const app = express()

app.set("port", process.env.PORT || 3000);

app.use(express.static("./public"));
app.set("view engine", "ejs");


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tulsi Prasad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tulsi Prasad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Tulsi Prasad'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: place,
                address: req.query.address
            })
        })

    })

})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tulsi Prasad',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tulsi Prasad',
        errorMessage: 'Page not found.'
    })
})


app.listen(app.get("port"), () => {
    console.log("Server running on port 3000")
})