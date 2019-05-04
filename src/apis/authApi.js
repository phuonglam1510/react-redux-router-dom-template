
import { request } from './request';

export const login = (email, password) => {
    // var currentDate = new Date();
    // var time_zone = (currentDate.getTimezoneOffset() / -60);

    return request('api/auth/signin/email', {
        method: 'post',
        data: {
            email, password
        }
    });
}

export const isAuthenticated = () => {
    return localStorage.getItem('token');
}

export default {
    login,
    isAuthenticated
}