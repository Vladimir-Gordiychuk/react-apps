import React from 'react';

export default class VideoDetail extends React.Component {

    render() {
        if (!this.props.video) {
            return (
                <div className="ui segment">
                    <div className="ui active dimmer">
                        <div className="ui text loader"></div>
                    </div>
                </div>
                );
        }

        const snippet = this.props.video.snippet;

        return (
            <div>
                <div className="ui embed">
                    <iframe
                        src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="ui segment">
                    <h4 className="ui header">{snippet.title}</h4>
                    <p>{snippet.description}</p>
                </div>
                
            </div>
            );
    }

};