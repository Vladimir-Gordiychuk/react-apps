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
            <div className="ui form">
                <h4 className="ui dividing header">Load STL object</h4>
                <div className="field">
                    <div className="fields">
                        <div className="four wide field">
                            <label>File source</label>
                            <input
                                type="file"
                                ref={this.fileInputRef}
                                onInput={this.handleFileInput}
                                hidden
                            />
                            <button
                                onClick={() =>
                                    this.fileInputRef.current.click()
                                }
                                className="ui button"
                            >
                                <i className="file icon"></i>
                                Choose File
                            </button>
                        </div>
                        <div className="twelve wide field">
                            <label>External source</label>
                            <UrlInput onDataChange={this.onDataChange} />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Choose from samples</label>
                    <div className="fields">
                        <button
                            onClick={this.loadSampleCube}
                            className="ui button"
                        >
                            Cube
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
