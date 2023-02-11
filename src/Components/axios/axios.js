import axios, * as others from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:80/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});

export default instance;
