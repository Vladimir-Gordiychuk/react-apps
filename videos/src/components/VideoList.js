import React from 'react';
import VideoItem from './VideoItem';

export default class VideoList extends React.Component {

    render() {

        var cards = this.props.videos.map(
            video => <VideoItem
                video={video}
                key={video.id.videoId}
                onClick={this.props.onSelect} />
        );

        return (
            <div className="ui relaxed divided list">
                {cards}
            </div>
            );
    }

};