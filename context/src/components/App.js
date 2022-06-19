import React from 'react';
import UserCreate from './UserCreate';

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
                <div>
                    Select a language ({this.state.language}):
                    <i className="flag us"
                        onClick={() => this.setLanguage('english')} />
                    <i className="flag nl"
                        onClick={() => this.setLanguage('dutch')} />
                </div>
                <UserCreate />
            </div>
        );
    }
};

export default App;