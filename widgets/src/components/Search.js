import { useState, useEffect } from 'react';

import wikipedia from '../apis/wikipedia';

const Search = () => {

    const [term, setTerm] = useState('React');
    const [request, setRequest] = useState(term);
    const [results, setResults] = useState([]);

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

    useEffect(() => {
        if (request) {
            search(request);
        }
    }, [request]);

    useEffect(() => {
        if (!term)
            return;

        if (results.length === 0) {
            setRequest(term);
            return;
        }

        const timer = setTimeout(() => setRequest(term), 1000);

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
                    <iframe id={'frame' + result.id}
                        srcDoc={result.content}
                        width="100%"
                        frameBorder="0"
                        />
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