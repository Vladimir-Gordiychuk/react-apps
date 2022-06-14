import React from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends React.Component {

    render() {

        const songs = this.props.songs || [];

        const renderedSongs = songs.map(
            song => (
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <button className="ui button primary"
                            onClick={() => this.props.selectSong(song)}
                        >
                            Select
                        </button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            )
        );

        return (
            <div className="ui divided list">
                {renderedSongs}
            </div>
        );
    }

};


const mapStateToProps = ({ songs }) => {
    return {
        songs
    };
};

export default connect(mapStateToProps, {
    selectSong
})(SongList);