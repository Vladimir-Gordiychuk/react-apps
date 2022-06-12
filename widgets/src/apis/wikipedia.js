import axios from 'axios';

const wikipedia = axios.create({
    baseURL: 'https://ru.wikipedia.org/w/api.php',
    params : {
        action: 'query',
        list: 'search',
        format: 'json',
        origin: '*'
    }
});

export default wikipedia;