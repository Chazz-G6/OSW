const weather = require('./weather.js');
const search = require('./query.js');

const Cities = [
    {
        'name':'seoul',
        'title':'서울',
        'latitude':37.6,
        'longitude':127
    },
    {
        'name':'busan',
        'title':'부산',
        'latitude':35,
        'longitude':129
    },
    {
        'name':'gwangju',
        'title':'광주',
        'latitude':35.1,
        'longitude':126.8
    },
    {
        'name':'suwon',
        'title':'수원',
        'latitude':37.17,
        'longitude':127.01
    },
    {
        'name':'daejeon',
        'title':'대전',
        'latitude':35.19,
        'longitude':128.1
    }
];

const getPlacesRank = async () => {
    let list = [];
    
    const promises = Cities.map(city => {
        return weather.getWeather(city.latitude, city.longitude)
            .then(weather => {
                list.push({
                    'city': city.title,
                    'temp': weather.temp,
                    'weather': weather.weather
                });
            })
    })

    await Promise.all(promises);
    
    return list;
}

const getPlaces = async () => {
    const placesRank = await getPlacesRank();
    
    let placeList = [];
    let rank = 0;

    const promises = placesRank.map(place => {
        return search.getQueryResult(place.city + "명소")
            .then(places => {
                
                let json = JSON.parse(places);
                let old = JSON.stringify(json)
                                .replace('<b>', '')
                                .replace('</b>','');
                let newJson = JSON.parse(old);

                let length = Object.keys(newJson.items).length;

                placeList.push({
                    'city': place,
                    'place': newJson.items[Math.floor(Math.random() * length)]
                })
            })
    });

    await Promise.all(promises);

    placeList.sort((a, b) => {
        return (
            ((b.city.weather === "Clear" ? 1 : 0)) - ((a.city.weather === "Clear" ? 1 : 0)) +
            ((b.city.weather === "Clouds" ? 0.5 : 0)) - ((a.city.weather === "Clouds" ? 0.5 : 0)) + 
            ((b.city.weather === "Rain" ? -1 : 0)) - ((a.city.weather === "Rain" ? -1 : 0)) + 
            (Math.sign(Math.abs(20 - a.city.temp) - Math.abs(20 - b.city.temp)))
        );
    })

    console.log(placeList);

    return placeList;
}

module.exports = {
    getPlaces,
}