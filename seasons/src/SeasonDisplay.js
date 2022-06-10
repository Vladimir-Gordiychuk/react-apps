import './SeasonDisplay.css';

import { Component } from 'react';

const seasonConfig = {
	summer: {
		name: 'summer',
		message: 'Let\'s hit the beach!',
		icon: 'sun'

	},
	winter: {
		name: 'winter',
		message: 'Burr, it is chilly',
		icon: 'snowflake'
    }
};

const getSeason = (latitude, month) => {
	if (latitude > 0.0) {
		// north
		return (3 <= month && month <= 8) ? 'summer' : 'winter';
	}
	return (3 <= month && month <= 8) ? 'winter' : 'summer';
};

export default class SeasonDisplay extends Component {

	render() {

		if (this.props.latitude) {
			const season = seasonConfig[getSeason(this.props.latitude, new Date().getMonth())];
			return (
				<div className={`season-display ${season.name}`}>
					<i className={`icon-left massive ${season.icon} icon`}></i>
					<h1>
						{season.message}
					</h1>
					<i className={`icon-right massive ${season.icon} icon`}></i>
				</div>
			);
		}

	}

};