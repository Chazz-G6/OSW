import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './Home.css';

import Contents from './Contents';
import Query from './Query';

class Home extends Component {
    state = {
        query: "",
        keyword: "",
        redirect: false
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.searchQeury(e);
        }
    }

    searchQeury = (e) => {
        this.setState({
            redirect: true,
            keyword: this.state.query
        });
    }

    render() {
        let result;
        if (this.state.redirect) {
            result = <Query keyword={this.state.keyword}/>
        } else {
            result = <Contents/>
        }

        return (
            <BrowserRouter>
                <div>
                    <div className="home-title-area">
                        <a href="/" className="home-title">Date Mate</a>
                    </div>
                    <div className="home-search-bar">
                        <div className="home-search-icon" ><img class="icon-image" src="resource/search.png" alt="search-icon" /></div>
                        <input className="home-search-text" type="text"
                            value={this.state.query}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown} />
                        <span className="home-search-button" onClick={this.searchQeury}>검색</span>
                    </div>
                    {result}
                </div>
                <Switch>
                    <Route path="/query" component={result}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Home;