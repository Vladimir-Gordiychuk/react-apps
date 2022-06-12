import { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';
import SearchBar from './SearchBar';

const languages = [
    {
        label: 'Ukranian',
        value: 'uk'
    },
    {
        label: 'Polish',
        value: 'pl'
    },
    {
        label: 'Afrikaans',
        value: 'af'
    },
    {
        label: 'Arabic',
        value: 'ar'
    },
    {
        label: 'Hindi',
        value: 'hi'
    }
];

const Translate = (props) => {

    const [language, setLanguage] = useState(languages[0]);
    const [text, setText] = useState('');

    return (
        <div className="ui container">
            <div className="ui segment">
                <SearchBar label="Input Text" onSearch={setText}/>
                <Dropdown options={languages}
                    onSelect={setLanguage}
                    selection={language}>
                    Select Language
                </Dropdown>
                <div className="ui divider"></div>
                <h3 className="ui header">Output</h3>
                <Convert text={text} language={language.value} />
                <div className="ui divider"></div>
                <div>
                    Sponsored by <a href="https://www.udemy.com/user/sgslo/">Stephen Grider</a>
                </div>
            </div>
        </div>
        );

};

export default Translate;