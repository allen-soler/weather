const request = require('postman-request');

const geoCode = (address, callback) => {
    console.log(address)
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFnZ2F6IiwiYSI6ImNrenkxN2gwZjA2eGQyb21vaHBtaXl1bnUifQ.teonjiuTpBis8bCw5GUCcQ&limit=1`
    request({ url: geoUrl, json: true }, (error, {body}) => {
        let data = body.features[0];
        if (error)
            callback(`Unable to connect to location service!`, undefined);
        else if (body.features.length === 0)
            callback(`Unable to find location. Try another search.`, undefined);
        else
            callback(undefined, {
                latitude: data.center[0],
                longitude: data.center[1],
                location: data.place_name
            })
    })
}



module.exports = geoCode;
