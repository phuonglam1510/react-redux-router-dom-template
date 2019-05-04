import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

// import '../styles/Chart.scss';
const data = [{
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
},
{
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
},
{
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
},
{
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
},
{
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
},
{
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
},
{
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
},
{
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
},
{
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
},
{
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
},
{
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
}, {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
},
{
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
}];

class Chart extends Component {
    render() {
        const { width, lines, timeKey, dataKey, data } = this.props;
        return (
            <LineChart width={width || 900} height={300} data={data} margin={{ left: 30, right: 30 }}>
                <CartesianGrid horizontal={false} />
                <XAxis hide dataKey={timeKey || 'name'} />
                <Tooltip />
                <Line dot={{ r: 5 }} type="linear" dataKey={dataKey || 'pv'} strokeWidth={3} stroke={"#8884d8"} />
                {lines !== 1 && <Line dot={{ r: 5 }} type="linear" dataKey={dataKey || "uv"} strokeWidth={3} stroke="#82ca9d" />}
            </LineChart>
        );
    }
}



export default Chart;