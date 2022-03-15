const request = require('postman-request');

const foreCast = (latitude, longitude, callback) => {
    console.log(latitude);
    console.log(longitude);
    const url = `http://api.weatherstack.com/current?access_key=532602713c39b087bcc9d4f0fc92b954&query=${longitude},${latitude}&units=m`;
    request({ url, json: true }, (error, {body}) => {
        if (error)
            callback("No internet conection", undefined)
        else if(body.success === false)
            callback("Cordinates are wrong", undefined)
        else {
            callback(undefined,`The temperature for today ${body.current.temperature}, its feels like : ${body.current.feelslike} and ${body.current.weather_descriptions[0]}`)
        }
    })

}

module.exports = foreCast;