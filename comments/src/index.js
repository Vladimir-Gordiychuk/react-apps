import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

import './style/App.css';

class App extends Component {

    render() {
        return (
            <div className="ui container comments">
                <ApprovalCard>
                    <h3>Are you sure that you want to do it?</h3>
                </ApprovalCard>
                <ApprovalCard>
                    <CommentDetail
                        author="Sam"
                        message="Nice blog post!"
                        date="Yesterday at 7:00PM"
                    />
                </ApprovalCard>
                <ApprovalCard>
                    <CommentDetail
                        author="Jane"
                        message="Brilliant!"
                        date="Today at 9:34AM"
                    />
                </ApprovalCard>
                <ApprovalCard>
                    <CommentDetail
                        author="Tim"
                        message="I agree)"
                        date="Today at 12:57PM"
                    />
                </ApprovalCard>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);