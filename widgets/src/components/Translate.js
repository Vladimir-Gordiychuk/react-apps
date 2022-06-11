import { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';
import SearchBar from './SearchBar';

const languages = [
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
        <div className="ui segment">
            <SearchBar label="Input Text" onSearch={setText}/>
            <Dropdown options={languages}
                onSelect={setLanguage}
                selection={language}>
                Select Language
            </Dropdown>
            <hr />
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language.value} />
        </div>
        );

};

export default Translate;