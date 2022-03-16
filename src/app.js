const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geo = require('./utils/geo.js');
const foreCast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;
//Define paths for express
const pwd = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//handlerbards engines and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static pwd to server
app.use(express.static(pwd));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jorge Allen'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jorge Allen'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jorge Allen',
        msg: 'If you have a problem, please contact : Jorge Allen'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geo(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({error})
        else {
            foreCast(latitude, longitude, (error, forecast) => {
                if (error)
                    return res.send({error})
                res.send({
                    forecast: forecast,
                    location: location,
                    address: req.query.address
                })
            });
        }
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: "404 help",
        name: 'Jorge Allen',
        error: 'Page not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: "404",
        name: 'Jorge Allen',
        error: 'Page not found.'
    });
})

//3k for localhost
app.listen(port, () => {
    console.log('server is up on port 3000.');
});