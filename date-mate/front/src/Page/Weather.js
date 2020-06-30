import React, { Component } from 'react';
import {IoIosCloud, IoIosSunny, IoIosRainy, IoIosCloseCircle} from "react-icons/io";
import './Weather.css';

const Weathers = {
    "Sunny": <IoIosSunny size="20" color="Black"/>,
    "Clouds": <IoIosCloud size="20" color="Black"/>,
    "Rain": <IoIosRainy size="20" color="Black"/>
};

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

class Weather extends Component{
    state = {
        cities: {
            seoul: {
            },
            busan: {
            },
            gwangju: {
            },
            suwon: {
            },
            daejeon: {
            }
        }
    }

    componentDidMount() { 
        Cities.map(city => {
            this.getWeather(city.latitude, city.longitude)
                    .then(res => {
                        this.state.cities[city.name] = {
                            temp: res.temp,
                            weather: res.weather
                        }
                        this.setState(this.state);
                    })
        });
    }

    getWeather = async(latitude, longitude) => {
        const response = await fetch('/api/weather?latitude=' + latitude + '&longitude=' + longitude);
        const body = await response.json();
        return body;
    }

    render(){
        return(
            <div className="weather-container">
                <div className="weather">
                    <img class="map-image" src="resource/map.jpg" alt="map"/>
                    {
                        Cities.map(city => {
                            return (
                                <div className={city.name}>
                                    <div>
                                        {city.title} {this.state.cities[city.name].temp}℃
                                    </div>
                                    <div>
                                        {
                                            Weathers[this.state.cities[city.name].weather] ? 
                                                Weathers[this.state.cities[city.name].weather] : 
                                                <IoIosCloseCircle size="20" color="black"/>
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>                
            </div>
        )
    }
};

export default Weather;