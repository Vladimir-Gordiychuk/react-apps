import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';
import SearchBar from './SearchBar';

import libreTranslate from '../apis/libre-translate';

const Translate = (props) => {

    // Language format: { label: 'Ukranian', value: 'uk' }
    const [languages, setLanguages] = useState(null);
    const [text, setText] = useState('');
    const [sourceCode, setSourceCode] = useState(null);
    const [target, setTarget] = useState(null);

    useEffect(() => {
        if (!languages) {
            libreTranslate.getLanguages().then(supportedLanguages => {
                const mappedLanguages = supportedLanguages.map(
                    lang => ({
                        label: lang.name,
                        value: lang.code
                    })
                );
                setLanguages(mappedLanguages);
            });
        }
    }, []);

    // When supported language collection is fetched
    // set 'initial' value for selected language.
    useEffect(() => {
        if (languages) {
            setTarget(languages[0]);
        }
    }, [languages]);

    // Whenever text gets updated
    // run language detection procedure again.
    useEffect(() => {
        if (text) {
            libreTranslate.detectLanguage(text).then(setSourceCode);
        }
    }, [text]);

    return (
        <div className="ui container">
            <div className="ui segment">
                <SearchBar label="Input Text" onSearch={setText} />
                {target ?
                    <Dropdown options={languages}
                        onSelect={setTarget}
                        selection={target}>
                        Select Language
                    </Dropdown>
                    : null
                }
                <div className="ui divider"></div>
                <h3 className="ui header">Output</h3>
                <Convert text={text} source={sourceCode} target={target ? target.value : null} />
                <div className="ui divider"></div>
                <div>
                    Implemented using <a href="https://libretranslate.de/">Libre Translate API</a>
                </div>
            </div>
        </div>
        );

};

export default Translate;