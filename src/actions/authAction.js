import * as types from './types';
import { apiSerializer } from '../helpers/apiSerializer';
import { UNKNOWN_ERROR } from '../constants/MESSAGE';


export function signInSuccess(data) {
    return {
        type: types.SIGN_IN_SUCCESS,
        data
    }
}


export function _logout() {
    return {
        type: types.LOG_OUT
    }
}


export const login = (email, password) => async (dispatch, getState, thunkDependencies) => {
    try {
        const response = await thunkDependencies.auth.login(email, password);
        const result = apiSerializer(response);
        const { token, id } = result;
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', id)
        dispatch(signInSuccess(result));
        return { data: result };
    } catch (error) {
        console.log(error);
        return { error: error.message || UNKNOWN_ERROR };
    }
};

export const logout = () => async (dispatch, getState, thunkDependencies) => {
    try {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        dispatch(_logout());
        return { data: true };
    } catch (error) {
        console.log(error);
        return { error: error.message || UNKNOWN_ERROR };
    }
};