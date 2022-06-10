import React from 'react';

export default class SearchBar extends React.Component {

    state = { term: '' };

    onFormSubmit = (event) => {
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.term);
        }
    }

    render() {
        return (
            <div className="ui segment">
                <form className="ui form"
                    onSubmit={this.onFormSubmit}
                >
                    <div className="field">
                        <label htmlFor="keyword">Search for: </label>
                        <input
                            id="keyword"
                            type="text"
                            onChange={(e) => this.setState({ term: e.target.value })}
                            value={this.state.term}
                        />
                    </div>
                </form>
            </div>
        );
    }
}