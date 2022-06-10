import './App.css';

import React from 'react';
import unsplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import CardList from './CardList';

export default class App extends React.Component {

    state = {
        results: []
    }

    onSearchSubmit = (term) => {
        unsplash.get(
            '/search/photos',
            {
                params: {
                    query: term,
                    page: 1,
                    per_page: 10
                }
            }).then(
                this.onResultsRecieved
            );
    }

    onResultsRecieved = (response) => {
        this.setState({
            results: response.data.results
        });
    }

    render() {
        return (
            <div className="ui container" style={{ marginTop: '10px' }}>
                <SearchBar onSubmit={this.onSearchSubmit} />
                <ImageList items={this.state.results} />
            </div>
        );
    }
}
