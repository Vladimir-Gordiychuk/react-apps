import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import useVideos from '../hooks/useVideos';

const App = () => {

    const [videos, search] = useVideos('world wonders');
    const [selected, setSelected] = useState(videos[0]);

    useEffect(() => {
        setSelected(videos[0]);
    }, [videos]);

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
                            onSelect={setSelected} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;