import './App.css';
import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import youtube from '../apis/youtube';

export default class App extends React.Component {

    state = {
        videos: [],
        selected: null
    }

    setTerm = (term) => {
        youtube.get('/search', {
            params: {
                q: term
            }
        }).then(
            this.onResultsRecieved
        );
    }

    onResultsRecieved = (response) => {
        this.setState({
            videos: response.data.items,
            selected: response.data.items[0]
        });
    }

    onVideoSelected = (video) => {
        this.setState({
            selected: video
        });
    }

    componentDidMount() {
        this.setTerm('world wonders');
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onSubmit={this.setTerm} />
                <div className="ui grid">
                    <div className="ui row">
                        <div class="eleven wide column">
                            <VideoDetail video={this.state.selected} />
                        </div>
                        <div class="five wide column">
                            <VideoList videos={this.state.videos} onSelect={this.onVideoSelected} />
                        </div>
                    </div>
                </div>
                
                
            </div>
        );
    }
}
