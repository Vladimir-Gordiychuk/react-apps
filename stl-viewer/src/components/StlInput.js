import React from "react";
import axios from "axios";

import StlModel from "../viewer/StlModel";
import UrlInput from "./UrlInput";

import { loadBinaryStl } from "../viewer/util";

export default class StlInput extends React.Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
    }

    loadSampleCube = async () => {
        const model = await loadBinaryStl("/cube.stl");
        this.props.onModelChange(model);
    };

    handleFileInput = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const model = new StlModel();
            model.readArrayBuffer(e.target.result);
            this.props.onModelChange(model);
        };
        reader.readAsArrayBuffer(file);
    };

    onDataChange = (data) => {
        const model = new StlModel();
        model.readArrayBuffer(data);
        this.props.onModelChange(model);
    };

    render() {
        return (
            <div className="ui dividing header">
                <input
                    type="file"
                    ref={this.fileInputRef}
                    onInput={this.handleFileInput}
                    hidden
                />
                <button
                    onClick={() => this.fileInputRef.current.click()}
                    className="ui button"
                >
                    <i className="file icon"></i>
                    Choose File
                </button>
                <UrlInput onDataChange={this.onDataChange} />
                <button onClick={this.loadSampleCube} className="ui button">
                    Load Sample Cube
                </button>
            </div>
        );
    }
}
