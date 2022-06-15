import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

const getPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
}

const getUser = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
}

export default {
    api,
    getPosts,
    getUser
};