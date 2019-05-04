import auth from './authApi';
import auction from './auctionApi';
import auctioneer from './auctioneerApi';
import analytic from './analyticApi';

const thunkDependencies = {
    auth,
    auction,
    auctioneer,
    analytic
};

export default thunkDependencies;
