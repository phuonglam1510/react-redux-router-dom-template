
import { request } from './request';

export const list = () => {
    return request('users', {
        method: 'get',
        withCredentials: false
    });
}
export const detail = (id) => {
    return request('users/' + id, {
        method: 'get',
        withCredentials: false
    });
}

export default {
    list,
    detail
}