
import { combineReducers } from 'redux';

import auctioneer from './auctioneerReducer'
import auction from './auctionReducer'
import auth from './authReducer'

const rootReducer = combineReducers({
    auth,
    auctioneer,
    auction
});

export default rootReducer;
