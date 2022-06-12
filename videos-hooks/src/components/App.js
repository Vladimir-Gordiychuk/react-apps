import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import youtube from '../apis/youtube';

const App = () => {

    const [videos, setVideos] = useState([]);
    const [selected, setSelected] = useState(null);

    const search = async (term) => {
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        });
        
        setVideos(response.data.items);
        setSelected(response.data.items[0]);
    };

    useEffect(() => {
        search('world wonders');
    }, []);

    return (
        <div className="ui container">
            <SearchBar onSubmit={search} />
            <div className="ui grid">
                <div className="ui row">
                    <div class="eleven wide column">
                        <VideoDetail video={selected} />
                    </div>
                    <div class="five wide column">
                        <VideoList videos={videos}
                            onSelect={(video) => setSelected(video)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;