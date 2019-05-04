import axios from 'axios';
import EventEmitter from '../EventEmitter';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const defaultOptions = {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};


export const request = async (url, options, replace) => {
    const requestOptions = {
        ...defaultOptions,
        ...options
    };

    try {
        const response = await axios({
            url,
            ...requestOptions
        });
        return response.data;
    } catch (e) {
        console.log(e.response);
        const { status } = e.response;
        let data = e.response.data;

        switch (status) {
            case 200:
            case 201:
                return data;
            case 400:
            case 401: {
                const err = new Error(data.message || 'Your session is timeout. Please login again.');
                EventEmitter.emit("session_timeout");

                throw err;
            }
            case 500:
                throw new Error(
                    (data.err && data.err.message) || data.message || 'Whoops! Sorry something went wrong on our end. Our engineers are working on it.'
                );
            default:
                throw new Error('Whoops! Sorry something went wrong on our end. Our engineers are working on it.');
        }
    }
};

export const requestAuth = (url, options, replace) => {
    const authOption = {
        headers: {
            ...defaultOptions.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        ...options
    };
    return request(url, authOption, replace);
};
