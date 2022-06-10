import React from 'react';
import VideoCard from './VideoCard';

export default class VideoCardList extends React.Component {

    render() {

        var cards = this.props.videos.map(
            video => <VideoCard video={video} key={video.id.videoId} />
        );

        return (
            <div className="ui link cards">
                {cards}
            </div>
        );
    }

};