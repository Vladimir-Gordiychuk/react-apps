import "./Rotation.css";

import React from "react";

export default class Rotation extends React.Component {
  state = {
    x: 0,
    y: 0,
    z: 0,
  };

  get x() {
    return this.state.x;
  }

  set x(value) {
    this.setState({
      x: value,
    });
    this.props.onRotationChange({
      ...this.state,
      x: value,
    });
  }

  get y() {
    return this.state.y;
  }

  set y(value) {
    this.setState({
      y: value,
    });
    this.props.onRotationChange({
      ...this.state,
      y: value,
    });
  }

  get z() {
    return this.state.z;
  }

  set z(value) {
    this.setState({
      z: value,
    });
    this.props.onRotationChange({
      ...this.state,
      z: value,
    });
  }

  render() {
    return (
      <div className="ui form">
        <div className="field">
          <label>Rotate around X axis: {this.x} degree(s)</label>
          <input
            type="range"
            min="0"
            max="360"
            value={this.x}
            onChange={(e) => (this.x = e.target.value)}
            className="slider"
          />
        </div>
        <div className="field">
          <label>Rotate around Y axis: {this.y} degree(s)</label>
          <input
            type="range"
            min="0"
            max="360"
            value={this.y}
            onChange={(e) => (this.y = e.target.value)}
            className="slider"
          />
        </div>
        <div className="field">
          <label>Rotate around Z axis: {this.z} degree(s)</label>
          <input
            type="range"
            min="0"
            max="360"
            value={this.z}
            onChange={(e) => (this.z = e.target.value)}
            className="slider"
          />
        </div>
      </div>
    );
  }
}
