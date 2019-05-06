import * as types from './types';
import { apiSerializer } from '../helpers/apiSerializer';
import { UNKNOWN_ERROR } from '../constants/MESSAGE';


export function _refreshing(loading) {
    return {
        type: types.REFRESHING_USERS,
        loading
    }
}

export function _error(message) {
    return {
        type: types.UPDATE_USERS_ERROR,
        message
    }
}

export function _loading(loading) {
    return {
        type: types.LOADING_USERS,
        loading
    }
}

export function _updateUsers(users) {
    return {
        type: types.UPDATE_USERS,
        users
    }
}


export const listUsers = () => async (dispatch, getState, thunkDependencies) => {
    try {
        const initialized = getState().user.initialized;
        if (initialized) {
            dispatch(_refreshing(true))
        } else {
            dispatch(_loading(true))
        }
        const response = await thunkDependencies.user.list();
        const result = apiSerializer(response);
        dispatch(_updateUsers(result));
        return { data: result };
    } catch (error) {
        dispatch(_error(error.message || UNKNOWN_ERROR))
        return { error: error.message || UNKNOWN_ERROR };
    }
};