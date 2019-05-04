import * as types from '../actions/types';

const initial = {
    isLoggedIn: false,
    user: null
}
const authReducer = (state = initial, action) => {
    switch (action.type) {
        case types.SIGN_IN_SUCCESS:
            return {
                isLoggedIn: true,
                user: action.data
            };
        case types.LOG_OUT:
            return {
                isLoggedIn: false,
                user: null
            };
        default:
            return state;
    }
};

export default authReducer;
