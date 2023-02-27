import axios, * as others from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:80/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
        'Content-Type': 'multipart/form-data/application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});


export default instance;
