import _ from 'lodash';
import jsonplaceholder from '../apis/jsonplaceholder';

export const fetchPosts = () => async (dispatch) => {
    const posts = await jsonplaceholder.getPosts();
    dispatch({
        type: 'POSTS_FETCHED',
        payload: posts
    });
};

export const fetchUser = (userId) => async (dispatch) => {
    const user = await jsonplaceholder.getUser(userId);
    dispatch({
        type: 'USER_FETCHED',
        payload: user
    });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};