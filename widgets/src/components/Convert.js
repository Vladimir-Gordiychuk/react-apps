import { useState, useEffect } from 'react';

import googleTranslage from '../apis/google-translate';

const Convert = ({ text, language }) => {

    const [translated, setTranslated] = useState('');

    useEffect(() => {
        if (text) {
            console.log(`Translate '${text}' to '${language}'`);
            googleTranslage.post('', {}, {
                params: {
                    q: text,
                    target: language
                }
            }).then((response) => {
                if (response.data) {
                    setTranslated(response.data.data.translations[0].translatedText);
                }
            });
        }
    }, [text, language]);

    return <h2>{translated}</h2>;
}

export default Convert;