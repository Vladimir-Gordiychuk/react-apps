import React from 'react';
import unsplash from '../apis/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

export default class ImageSearch extends React.Component {

    state = {
        results: []
    }

    onSearch = (term) => {
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
                <SearchBar onSearch={this.onSearch} label="Search for Images" />
                <ImageList items={this.state.results} />
            </div>
        );
    }
}
