import * as types from '../actions/types';

const initial = {
    list: [],
    initialized: false,
    loading: false,
    refreshing: false,
    message: ''
}
const authReducer = (state = initial, action) => {
    switch (action.type) {
        case types.LOADING_USERS:
            return {
                ...state,
                loading: action.loading
            };
        case types.REFRESHING_USERS:
            return {
                ...state,
                refreshing: action.loading
            };
        case types.UPDATE_USERS:
            return {
                ...state,
                list: action.users,
                refreshing: false,
                initialized: true,
                loading: false
            };
        case types.UPDATE_USERS_ERROR:
            return {
                ...state,
                refreshing: false,
                message: action.message,
                loading: false
            };
        default:
            return state;
    }
};

export default authReducer;
