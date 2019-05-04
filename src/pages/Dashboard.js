import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Flexbox from '../components/Flexbox';
import Card from '../components/Card';
import { loadDashboard } from '../actions/auctioneerAction';
import { listAwaitingAuctions } from '../actions/auctionAction';
import { Route, Link, withRouter } from "react-router-dom";
import ReactPlaceholder from 'react-placeholder';
import _ from 'lodash';
import '../styles/Dashboard.scss';
import styles from '../styles/Colors.scss';
import Button from '../components/Button';
import Label from '../components/Label';
import Chart from '../components/LineChart';
import CompletedAuction from '../components/CompletedAuction';
import LoadingAuction from '../components/LoadingAuction';
import { overviewAnalyticsByTime } from '../apis/analyticApi';
import { apiSerializer } from '../helpers/apiSerializer';
import { TIME_PERIOD } from '../constants/ANALYTIC';
import Dropdown from '../components/Dropdown';
import { ROUTES } from '../constants/ROUTES';

const DashboardCard = ({ loading, header, value, lastOne }) => {
    return (
        <Card shadow noPadding containerStyle={{ flex: 1, marginRight: lastOne ? 0 : 15 }}>
            <div className="header">
                <h1>{header}</h1>
            </div>
            <div className="content">
                <ReactPlaceholder showLoadingAnimation={true} type='text' rows={1} ready={!loading}>
                    <div className="text">{value}</div>
                </ReactPlaceholder>
            </div>
        </Card>
    )
}

const timeRanges = [
    { text: 'This Month', value: TIME_PERIOD.THIS_MONTH },
    { text: 'This Week', value: TIME_PERIOD.THIS_WEEK },
    { text: 'Last Month', value: TIME_PERIOD.LAST_MONTH },
    { text: 'Last Week', value: TIME_PERIOD.LAST_WEEK }
]

class Dashboard extends Component {
    state = {
        dashboards: [{
            header: 'Total auction clicks',
            value: 'auction_click'
        }, {
            header: 'Total lot impressions',
            value: 'lot_impression'
        }, {
            header: 'Total auctions',
            value: 'total_auctions'
        }, {
            header: 'Followers',
            value: 'follower'
        }],
        chartData: [],
        selectedRange: timeRanges[0]
    }
    componentDidMount() {
        console.log('dashboard page');
        this.props.loadDashboard();
        this.props.listAwaitingAuctions();
        this.loadChart();
    }
    detailAuction = ({ auction }) => {
        const { history } = this.props;
        history.push(ROUTES.AWAITING_RESULTS + '/' + auction.id, { transition: 'in', from: { text: 'Dashboard', route: ROUTES.DASHBOARD } })
    }
    loadChart = async () => {
        this.setState({ loading: true });
        try {
            const rs = await overviewAnalyticsByTime(this.state.selectedRange.value);
            const result = apiSerializer(rs);
            this.setState({ chartData: result, loading: false });
        } catch (error) {
            console.log(error);
            this.setState({ message: error.message, loading: false });
        }
    }
    onChangeTimeRange = ({ item }) => {
        this.setState({ selectedRange: item }, () => {
            this.loadChart();
        });
    }
    render() {
        const { summary, loading, loadingCompleted, awaitingAuctions } = this.props;
        const { dashboards, chartData, selectedRange } = this.state;
        return (
            <div className="dashboard-page" style={{ padding: 20 }}>
                <Flexbox row spaceBetween>
                    <h1>Welcome ,Peter!</h1>
                    <Link to="/how-it-work">How Tractor Zoom Works</Link>
                </Flexbox>
                <hr />
                <Flexbox wrapperStyle={{ marginBottom: 15 }} row spaceBetween>
                    {dashboards.map((dashboard, index) => (
                        <DashboardCard header={dashboard.header} lastOne={index === dashboards.length - 1} value={summary[dashboard.value] || 1200} loading={loading}></DashboardCard>
                    ))}
                </Flexbox>
                <Card shadow noPadding containerStyle={{ flex: 1, }}>
                    <div className="header">
                        <Flexbox row spaceBetween>
                            <div>
                                <Dropdown onChanged={this.onChangeTimeRange} items={timeRanges} selected={selectedRange}></Dropdown>
                            </div>
                            <Flexbox row>
                                <Flexbox row>
                                    <Label containerStyle={{ marginLeft: 10, marginRight: 5 }} dot background={styles.primaryColor}></Label>
                                    <span style={{ fontSize: 12 }}>Auction Impressions</span>
                                </Flexbox>
                                <Flexbox row>
                                    <Label containerStyle={{ marginLeft: 10, marginRight: 5 }} dot background='green'></Label>
                                    <span style={{ fontSize: 12 }}>Auction Clicks</span>
                                </Flexbox>
                            </Flexbox>
                        </Flexbox>
                    </div>
                    <div style={{ minHeight: 300, padding: loading ? 30 : 0 }}>
                        <ReactPlaceholder showLoadingAnimation={true} type='text' rows={3} ready={!loading}>
                            <Chart lines={1} timeKey="date" dataKey="total_click" data={chartData.lot_impression}></Chart>
                        </ReactPlaceholder>
                    </div>
                </Card>
                <div>
                    <Flexbox row spaceBetween>
                        <h3 style={{ color: styles.grayColor, fontWeight: 300 }}>Awaiting Results</h3>
                        <h2> <span style={{ color: styles.primaryColor, fontSize: 15 }}>UNCLAIMED CREDIT </span>${_.sumBy(awaitingAuctions, "unclaim_credit")}</h2>
                    </Flexbox>
                    <div>
                        {loadingCompleted ?
                            _.range(0, 3).map(n => (<LoadingAuction key={n}></LoadingAuction>)) :
                            awaitingAuctions.map(auction => (
                                <CompletedAuction onClick={this.detailAuction} key={auction.id} auction={auction}></CompletedAuction>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        summary: state.auctioneer.summary,
        awaitingAuctions: state.auction.awaiting.list,
        loadingCompleted: state.auction.awaiting.loading,
        loading: state.auctioneer.loading
    };
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadDashboard,
        listAwaitingAuctions
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));