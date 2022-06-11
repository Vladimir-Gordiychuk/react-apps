import { useState } from 'react';
import Dropdown from './Dropdown';

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


    return (
        <div>
            <Dropdown options={languages}
                onSelect={setLanguage}
                selection={language}>
                Select Language
            </Dropdown>
        </div>
        );

};

export default Translate;