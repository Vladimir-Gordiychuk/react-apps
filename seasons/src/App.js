import './style/App.css';

import { Component } from 'react';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

export default class App extends Component {

    state = {
        latitude: null,
        error: null
    };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({
                latitude: position.coords.latitude
            }),
            (error) => {
                console.log(error);
                this.setState({
                    error: error.message
                })
            }
        );
    }

    renderContent() {
        if (this.state.error) {
            return (
                <div>
                    <p>Failed to acquire location.</p>
                    <p>Reason: {this.state.error}</p>
                </div>
            );
        }

        if (this.state.latitude) {
            return <SeasonDisplay latitude={this.state.latitude} />
        }

        return <Spinner text="Requesting your location..." />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
            );
    }

};