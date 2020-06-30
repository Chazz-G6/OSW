const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const weather = require('./weather.js');
const search = require('./query.js');
const place = require('./place.js');

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: true }));

app.get('/api/weather', (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    weather.getWeather(latitude, longitude)
        .then(result => {
            res.send({
                'temp': result.temp,
                'weather': result.weather
            });
        })

});

app.get('/api/place', (req, res) => {
    place.getPlaces()
        .then(result => {
            res.send(result);
        })
});

app.get('/api/query', (req, res) => {
    const query = req.query.query;

    search.getQueryResult(query)
        .then(result => {
            let json = JSON.parse(result);

            let old = JSON.stringify(json).replace('<b>', '').replace('</b>','');
            let newJson = JSON.parse(old);
            
            res.send({
                'query': newJson.items
            });
        });
});

app.listen(port, () => console.log(`Listen on ${port}`));