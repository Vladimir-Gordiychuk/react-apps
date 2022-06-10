import React from 'react';

export default class SearchBar extends React.Component {

	state = {
		term: ''
	};

	onFormSubmit = (e) => {
		e.preventDefault();

		if (this.props.onSubmit) {
			this.props.onSubmit(this.state.term);
		}
	}

	render() {
		return (
			<div className="ui segment search-bar">
				<form className="ui form"
					onSubmit={this.onFormSubmit}
				>
					<div className="field">
						<label htmlFor="search-bar" >Video Search</label>
						<input
							id="search-bar"
							type="text"
							value={this.state.term}
							onChange={(e) => this.setState({
								term: e.target.value
							})}
						/>
					</div>
				</form>
			</div>
			);
	}

}