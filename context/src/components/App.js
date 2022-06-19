import React from 'react';
import UserCreate from './UserCreate';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';

class App extends React.Component {
    state = { language: 'english' };

    setLanguage(language) {
        this.setState({
            language
        });
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui segment">
                    <div className="ui dividing header">
                        Select a language:
                        <i className="flag us"
                            onClick={() => this.setLanguage('english')} />
                        <i className="flag nl"
                            onClick={() => this.setLanguage('dutch')} />
                    </div>
                    <LanguageContext.Provider value={this.state.language}>
                        <ColorContext.Provider value={{
                            backgroundColor: 'grey',
                            color: 'black'
                        }}>
                            <UserCreate />
                        </ColorContext.Provider>
                    </LanguageContext.Provider>
                    <LanguageContext.Provider value={this.state.language}>
                        <UserCreate />
                    </LanguageContext.Provider>
                </div>
            </div>
        );
    }
};

export default App;