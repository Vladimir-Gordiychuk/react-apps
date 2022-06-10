import './VideoItem.css';

const VideoItem = ({ video, onClick }) => {
    const snippet = video.snippet;

    return (
        <div className="item video-item" onClick={() => onClick(video)}>
            <img className="ui image"
                src={snippet.thumbnails.medium.url}
                alt={snippet.description}
            />
            <div className="content">
                <div className="header">{snippet.title}</div>
            </div>
        </div>
        );
};

export default VideoItem;