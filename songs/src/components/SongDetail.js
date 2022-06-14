import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
    if (!song) {
        return <div>Select a song!</div>
    }

    return (
        <div className="ui segment">
            <div className="title">
                {song.title}
            </div>
            <div className="content">
                {song.duration}
            </div>
        </div>
    );
};

const mapStateToProps = ({ selectedSong }) => {
    return {
        song: selectedSong
    }
}

export default connect(mapStateToProps)(SongDetail);