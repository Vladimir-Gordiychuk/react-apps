import React from 'react';

export default class Rotation extends React.Component {

    state = {
        x : 0,
        y : 0,
        z : 0
    };

    get x() {
        return this.state.x;
    }

    set x(value) {
        this.setState({
            x: value
        });
        this.props.onRotationChange(this.state);
    }

    get y() {
        return this.state.y;
    }

    set y(value) {
        this.setState({
            y: value
        });
        this.props.onRotationChange(this.state);
    }    

    get z() {
        return this.state.z;
    }

    set z(value) {
        this.setState({
            z: value
        });
        this.props.onRotationChange(this.state);
    }        

    render() {
        return (
            <div>
                <input type="range" min="0" max="360" value={this.x}
                    onInput={e => this.x = e.target.value} />
                <input type="range" min="0" max="360" value={this.y}
                    onInput={e => this.y = e.target.value}/>
                <input type="range" min="0" max="360" value={this.z}
                    onInput={e => this.z = e.target.value}/>
            </div>
        );
    }

};