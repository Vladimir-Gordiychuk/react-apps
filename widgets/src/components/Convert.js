import { useState, useEffect } from 'react';

import libreTranslate from '../apis/libre-translate';

const Convert = ({ text, source, target }) => {

    const [translated, setTranslated] = useState('');

    useEffect(() => {
        if (text && source && target) {
            console.log(`Translate '${text}' from '${source}' to '${target}'.`);
            libreTranslate.translate(text, source, target).then(setTranslated);
        }
    }, [text, source, target]);

    return <h2>{translated}</h2>;
}

export default Convert;