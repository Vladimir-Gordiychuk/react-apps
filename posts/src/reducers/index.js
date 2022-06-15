import { combineReducers } from 'redux';

const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case 'POSTS_FETCHED':
            return action.payload;
        default:
            return posts;
    }
};

const usersReducer = (users = [], action) => {
    switch (action.type) {
        case 'USER_FETCHED':
            const newUser = action.payload;
            if (!users.find(user => user.id === newUser.id)) {
                console.log(action.payload);
                return [...users, newUser];
            }
            else {
                // User already fetched.
                return users;
            }
        default:
            return users;
    }
};

export default combineReducers({
    posts: postsReducer,
    users: usersReducer
});