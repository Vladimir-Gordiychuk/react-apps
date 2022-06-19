import React from 'react';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';

class Button extends React.Component {

    renderButton = (context) => {
        return (
            <button className="ui button primary" style={context} >
                <LanguageContext.Consumer>
                    {this.renderCaption}
                </LanguageContext.Consumer>
            </button>
        );
    }

    renderCaption = (context) => {
        return (context.language === 'english') ? 'Submit' : 'Voorleggen';
    }

    render() {
        return (
            <ColorContext.Consumer>
                {(context) =>
                    <button className="ui button primary" style={context} >
                        <LanguageContext.Consumer>
                            {this.renderCaption}
                        </LanguageContext.Consumer>
                    </button>
                }
            </ColorContext.Consumer>
        );
    }
};

export default Button;