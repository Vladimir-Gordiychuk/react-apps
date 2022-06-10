import { useState, useEffect } from 'react';

import wikipedia from '../apis/wikipedia';
import Accordion from './Accordion';

const Search = () => {

    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (term.length === 0)
            return;

        const timer = setTimeout(() => {
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
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [term]);

    const onChange = (event) => {
        setTerm(event.target.value);
    }

    var renderedResults = results.map((result) => {

        return (
            <div key={result.id} className="item">
                <div className="right floated content">
                    <a className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.id}`}
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    <div className="description">
                        <iframe id={'frame' + result.id}
                            className="content"
                            srcdoc={result.content}
                            width="100%"
                            frameBorder="0"
                            />
                    </div>
                </div>
            </div>
            );
    });

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
            {/*<Accordion items={results}/>*/}
            <div className="ui relaxed divided list">
                {renderedResults}
            </div>
        </div>
    );

};

export default Search;