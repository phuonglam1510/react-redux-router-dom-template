import React, { Component } from 'react';
import styles from '../styles/Colors.scss';
import _ from 'lodash';
import '../styles/Table.scss';
import ReactPlaceholder from 'react-placeholder';

const loadingData = [{}, {}, {}]

class Table extends Component {
    render() {
        const { columns, data, renderCell, rowClick, loading } = this.props;
        return (
            <table className="table-container">
                <tr className="header">
                    {columns.map(col =>
                        (
                            <th key={col.key}>{col.header}</th>
                        ))}
                </tr>
                {loading ? loadingData.map(item => (
                    <tr className="row" onClick={rowClick}>
                        {columns.map(col =>
                            <td key={col.key}>
                                <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} color='#E0E0E0' style={{ width: 100 }}><div></div></ReactPlaceholder>
                            </td>
                        )}
                    </tr>
                )) : data.map(item => (
                    <tr className="row" onClick={rowClick}>
                        {columns.map(col => {
                            if (renderCell) {
                                return renderCell({ item, column: col });
                            } else {
                                return <td>{item[col.key].toString()}</td>;
                            }
                        })}
                    </tr>
                ))
                }
            </table>
        );
    }
}



export default Table;