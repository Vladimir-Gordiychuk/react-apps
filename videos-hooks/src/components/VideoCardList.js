import VideoCard from './VideoCard';

const VideoCardList = (props) => {
    var cards = props.videos.map(
        video => <VideoCard video={video} key={video.id.videoId} />
    );

    return (
        <div className="ui link cards">
            {cards}
        </div>
    );
};

export default VideoCardList;