import React, { Component } from 'react';
import './Query.css';

class QueryResult extends Component {
    render () {
        return (
            <div className="result-container">
                <div>
                <a href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.title}</a>
                </div>
                <div>
                종류: {this.props.category}
                </div>
                <div>
                위치: {this.props.address}
                </div>
                <div>
                번호: {this.props.telephone}
                </div>
            </div>
        )
    }
}

class Query extends Component {
    state = {
        word: "",
        results: []
    }

    componentDidMount() {
        this.UpdateQuery();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.keyword !== prevProps.keyword) {
            this.UpdateQuery();
        }
    }

    UpdateQuery = () => {
        this.getQuery()
            .then(res => {
                this.setState({
                    word: res.query,
                    results: res.query
                })
            })
            .catch(err => console.log(err));
    }

    getQuery = async () => {
        const response = await fetch('/api/query?query=' + this.props.keyword + "맛집");
        const body = await response.json();

        return body;
    }

    render() {
        return (
            <div className="query-contatiner">
                {
                    this.state.results.map(q => {
                        return (
                        <QueryResult
                        title={q.title}
                        category={q.category}
                        address={q.address}
                        telephone={q.telephone}
                        link={"https://map.naver.com/v5/search/" + q.title}
                        // link={q.link}
                        />)
                    })
                }
            </div>
        )
    }
}


export default Query;