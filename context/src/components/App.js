import React from 'react';
import UserCreate from './UserCreate';
import { LanguageStore } from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';
import LanguageSelector from './LanguageSelector';

class App extends React.Component {

    render() {
        return (
            <LanguageStore>
                <div className="ui container">
                    <div className="ui segment">
                        <LanguageSelector />
                        <ColorContext.Provider value={{
                            backgroundColor: 'grey',
                            color: 'black'
                        }}>
                            <UserCreate />
                        </ColorContext.Provider>
                        <UserCreate />
                    </div>
                </div>
            </LanguageStore>
        );
    }
};

export default App;