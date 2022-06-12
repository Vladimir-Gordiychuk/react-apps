import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos, onSelect }) => {

    var cards = videos.map(
        video => <VideoItem
            video={video}
            key={video.id.videoId}
            onClick={onSelect} />
    );

    return (
        <div className="ui relaxed divided list">
            {cards}
        </div>
        );

};

export default VideoList;