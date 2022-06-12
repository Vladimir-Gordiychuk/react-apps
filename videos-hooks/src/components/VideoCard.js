const VideoCard = (props) => {
    const video = props.video;

    return (
            <div className="card">
                <div className="image">
                    <img src={video.snippet.thumbnails.medium.url} />
                </div>
                <div className="content">
                    <div className="header">
                        {video.snippet.title}
                    </div>
                    <div className="meta">
                        <a>{video.snippet.channelTitle}</a>
                    </div>
                    <div className="description">
                        {video.snippet.description}
                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated">
                        Joined in 2013
                    </span>
                    <span>
                        <i className="user icon"></i>
                        75 Friends
                    </span>
                </div>
            </div>
        );
};

export default VideoCard;