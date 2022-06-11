import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, timeout, label }) => {

    const [term, setTerm] = useState('');

    useEffect(() => {
        if (!term)
            return;

        const timer = setTimeout(() => {
            if (term) {
                onSearch(term);
            }
        }, timeout || 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [term]);

    const onChange = (event) => {
        setTerm(event.target.value);
    }

    return (
        <div className="ui form">
            <div className="field">
                <label htmlFor="query">{label || 'Search for'}</label>
                <input id="query" value={term} onChange={onChange} />
            </div>
        </div>
    );

};

export default SearchBar;