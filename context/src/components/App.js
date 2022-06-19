import React from 'react';
import UserCreate from './UserCreate';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';
import LanguageSelector from './LanguageSelector';

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
                    <LanguageSelector onLanguageChange={this.setLanguage} />
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