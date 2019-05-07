
import { request } from './request';

export const login = (email, password) => {
    /*return request('api/auth/signin/email', {
        method: 'post',
        data: {
            email, password
        }
    });*/

    return new Promise(resolve => {
        resolve({ id: 1, token: 'test_token', email })
    });
}

export const isAuthenticated = () => {
    return localStorage.getItem('token');
}

export default {
    login,
    isAuthenticated
}