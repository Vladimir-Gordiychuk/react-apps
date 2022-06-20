import React from "react";
import axios from "axios";

export default class UrlInput extends React.Component {
    state = {
        url: "",
        status: null,
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
                status: "OK",
                data: response.data,
            });
            this.props.onDataChange(response.data);
        } catch {
            this.setState({
                status: "Error",
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

    render() {
        return (
            <form className="ui form" onSubmit={this.onFormSubmit}>
                <div className="field">
                    <input
                        type="text"
                        value={this.state.url}
                        placeholder="Link to external Binary STL file"
                        onChange={(e) => this.onLinkChange(e.target.value)}
                    />
                    {this.state.status}
                </div>
            </form>
        );
    }
}
