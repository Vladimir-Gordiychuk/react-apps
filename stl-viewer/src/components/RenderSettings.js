import "./RenderSettings.css";

import React from "react";

export default class RenderSettings extends React.Component {
    state = {
        solid: true,
        wireframe: true,
    };

    toggleSolid = () => {
        const solid = !this.state.solid;
        this.setState({
            solid,
        });
        this.props.onChange({
            ...this.state,
            solid,
        });
    };

    toggleWireframe = () => {
        const wireframe = !this.state.wireframe;
        this.setState({
            wireframe,
        });
        this.props.onChange({
            ...this.state,
            wireframe,
        });
    };

    render() {
        return (
            <div className="ui segment">
                <div className="ui form">
                    <div className="ui field">
                        <div className="ui toggle checkbox">
                            <input
                                type="checkbox"
                                checked={this.state.solid}
                                onChange={() => this.toggleSolid()}
                            />
                            <label className="coloring red">Solid</label>
                        </div>
                    </div>
                    <div className="ui field">
                        <div className="ui toggle checkbox">
                            <input
                                type="checkbox"
                                checked={this.state.wireframe}
                                onChange={() => this.toggleWireframe()}
                            />
                            <label className="coloring red">Wireframe</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
