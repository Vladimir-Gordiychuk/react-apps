import { useState, useEffect } from 'react';

import wikipedia from '../apis/wikipedia';
import Accordion from './Accordion';

const Search = () => {

    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => console.log('every render'));
    useEffect(() => console.log('first render only'), []);

    useEffect(() => {
        console.log('"term" changed -> ' + term)

        if (term.length === 0)
            return;

        wikipedia.get('', {
            params: {
                srsearch: term
            }
        }).then((response) => {
            console.log(response.data.query.search);
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
        });
    }, [term]);

    const onChange = (event) => {
        setTerm(event.target.value);
    }

    return (
        <div>
            <div className="ui segment">
                <div className="ui form">
                    <div className="field">
                        <label htmlFor="query">Search for</label>
                        <input id="query" value={term} onChange={onChange} />
                    </div>
                </div>
            </div>
            <Accordion items={results}/>
        </div>
    );

};

export default Search;