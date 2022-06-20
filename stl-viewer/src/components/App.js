import "./App.css";

import React from "react";
import StlViewer from "./StlViewer";

class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <StlViewer />
            </div>
        );
    }
}

export default App;
