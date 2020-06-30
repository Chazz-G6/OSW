import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './Contents.css';

import Weather from './Weather';
import Place from './Place';

class Contents extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="home-menu">
                    <Link to="/weather" className="label-contents-weather">
                        실시간 기상
                    </Link>
                    <Link to="/place" className="label-contents-place">
                        추천 장소
                    </Link>
                </div>
                <Switch>
                    <Route path="/weather" component={Weather} />
                    <Route path="/place" component={Place} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Contents;