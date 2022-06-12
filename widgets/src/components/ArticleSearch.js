import { useState, useEffect } from 'react';

import WikiCard from './WikiCard';

import wikipedia from '../apis/wikipedia';
import SearchBar from './SearchBar';

const WikiSearch = () => {

    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const search = async (term) => {
            const response = await wikipedia.get('', {
                params: {
                    srsearch: term
                }
            });

            if (response.data && !response.data.error) {
                setResults(response.data.query.search.map(item => {
                    return {
                        id: item.pageid,
                        title: item.title,
                        content: item.snippet,
                        isHtml: true
                    };
                }));
            }
        };

        if (term) {
            search(term);
        }
    }, [term]);

    var renderedResults = results.map(result => <WikiCard key={result.id} page={result} />);

    return (
        <div className="ui container">
            <SearchBar onSearch={setTerm} label="Search for Articles" />
            <div className="ui relaxed divided list">
                {renderedResults}
            </div>
        </div>
    );

};

export default WikiSearch;