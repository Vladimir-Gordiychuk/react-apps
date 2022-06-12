import { useState } from 'react';

const SearchBar = ({ onSubmit }) => {

	const[term, setTerm] = useState('');

	const onFormSubmit = (e) => {
		e.preventDefault();

		if (onSubmit) {
			onSubmit(term);
		}
	}

	return (
		<div className="ui segment search-bar">
			<form className="ui form"
				onSubmit={onFormSubmit}
			>
				<div className="field">
					<label htmlFor="search-bar" >Video Search</label>
					<input
						id="search-bar"
						type="text"
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>
				</div>
			</form>
		</div>
		);
}

export default SearchBar;