import React, { Component } from 'react';
import './Place.css';

class Place extends Component{
    state = {
        results:[]
    }

    componentDidMount() {
        this.getPlace()
            .then(result => {
                console.log(result);
                this.setState({
                    results: result
                })
            })
    }

    getPlace = async () => {
        const response = await fetch('/api/place')
        const body = await response.json();

        return body;
    }

    render() {
        return (
            <div className="place-container">
                {
                    this.state.results.map((q, i) => {
                        return (
                            <div className="place-container" key={i}>
                                <div>
                                    <a href={"https://map.naver.com/v5/search/" + q.place.title} target="_blank" rel="noopener noreferrer">
                                        {q.place.title}
                                    </a>
                                </div>
                                <div>
                                    종류: {q.place.category}
                                </div>
                                <div>
                                    위치: {q.place.address}
                                </div>
                                <div>
                                    번호: {q.place.telephone}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
};

export default Place;