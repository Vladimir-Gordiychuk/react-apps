import React from 'react';
import LanguageContext from '../contexts/LanguageContext';


class Button extends React.Component {

    renderCaption(context) {
        return (context === 'english') ? 'Submit' : 'Voorleggen';
    }

    render() {
        
        return (
            <button className="ui button primary">
                <LanguageContext.Consumer>
                    {this.renderCaption}
                </LanguageContext.Consumer>
            </button>
        );
    }
};

export default Button;