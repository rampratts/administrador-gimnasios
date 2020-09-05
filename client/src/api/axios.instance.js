import axios from 'axios';

const request = axios.create({
    baseURL: '/api/',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
    }
})

request.interceptors.request.use(function (config) {
    config.headers.Authorization =  `Bearer ${localStorage.getItem('auth_token')}`;
    return config;
});

export default request;
