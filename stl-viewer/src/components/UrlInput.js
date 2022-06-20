import React from "react";
import axios from "axios";

export default class UrlInput extends React.Component {
    state = {
        url: "",
        error: null,
        data: null,
    };

    onLinkChange = (url) => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.setState({
            url: url,
        });
        this.timer = setTimeout(this.onTimer, 1000);
    };

    onTimer = async () => {
        try {
            const response = await axios.get(this.state.url, {
                responseType: "arraybuffer",
                headers: {
                    "Content-Type": "application/octet-stream",
                },
            });
            this.setState({
                error: null,
                data: response.data,
            });
            this.props.onDataChange(response.data);
        } catch (e) {
            this.setState({
                error: e.message,
                data: null,
            });
        }
    };

    onFormSubmit = (e) => {
        e.preventDefault();

        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.onTimer();
    };

    renderError() {
        if (!this.state.error) return null;
        return (
            <div className="ui error message">
                <div className="header">Error</div>
                <p>{this.state.error}</p>
            </div>
        );
    }

    render() {
        const error = this.state.error ? "error" : "";
        return (
            <form className={`ui form ${error}`} onSubmit={this.onFormSubmit}>
                <div className="field">
                    <input
                        type="text"
                        value={this.state.url}
                        placeholder="Link to external Binary STL file"
                        onChange={(e) => this.onLinkChange(e.target.value)}
                    />
                    {this.renderError()}
                </div>
            </form>
        );
    }
}
