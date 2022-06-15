import React from 'react';
import { connect } from 'react-redux';

class UserHeader extends React.Component {

    renderLoading() {
        return <div>Loading...</div>;
    }

    render() {
        const { user, userId } = this.props;

        if (!userId) {
            return <div>Unknown User</div>
        }

        if (!user) {
            return this.renderLoading();
        }

        return (
            <div className="header">{user.name}</div>
        );
    }
};

const mapStateToProps = ({ users }, ownProps) => ({
    user : users.find(user => user.id === ownProps.userId)
});

export default connect(mapStateToProps)(UserHeader);