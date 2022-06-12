import React from 'react';

const VideoDetail = ({ video }) => {

    if (!video) {
        return null;
    }

    const snippet = video.snippet;

    return (
        <div>
            <div className="ui embed">
                <iframe
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
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

};

export default VideoDetail;