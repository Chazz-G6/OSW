const axios = require('axios');

const API_KEY = "edcb2ba02e4fbc731f545ef7fccf72e8";

const getWeather = async (latitude, longitude) => {
    const { data: {
        main: { temp },
        weather
    }} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`);

    return {
        "temp": temp, 
        "weather": weather[0].main
    }
}

module.exports = {
    getWeather
}