import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import useVideos from '../hooks/useVideos';

const YoutubeSearch = () => {

    const [videos, search] = useVideos('');
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (videos.length > 0) {
            setSelected(videos[0]);
        }
    }, [videos]);

    return (
        <div className="ui container">
            <SearchBar onSearch={search} label="Search for Videos" />
            {(videos.length > 0) ? <div class="ui divider"></div> : null}
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={selected} />
                    </div>
                    <div className="five wide column">
                        <VideoList videos={videos}
                            onSelect={setSelected} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YoutubeSearch;