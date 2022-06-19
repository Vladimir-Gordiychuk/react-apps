import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

class Field extends React.Component {
    static contextType = LanguageContext;

    render() {
        const caption = this.context.language === 'english' ? 'Name' : 'Naam';
        return (
            <div className="ui field">
                <label>{caption}</label>
                <input type="text" placeholder="Enter your name"></input>
            </div>
        );
    };
}


export default Field;