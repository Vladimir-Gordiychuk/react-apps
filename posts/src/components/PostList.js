import React from 'react';
import { connect } from 'react-redux';

import { fetchPostsAndUsers } from '../actions';

import UserHeader from './UserHeader';

class PostList extends React.Component {

    componentDidMount() {
        this.props.fetchPostsAndUsers();
    }

    renderPosts() {
        const posts = this.props.posts || [];

        return posts.map(post => (
            <div className="item" key={post.id}>
                <i className="large middle aligned icon user" />
                <div className="content">
                    <div className="description">
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                </div>
                <UserHeader userId={post.userId}/>
            </div>
            ));
    }

    render() {
        return <div className="ui relaxed divided list">
            {this.renderPosts()}
        </div>
    }
};

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, {
    fetchPostsAndUsers
})(PostList);