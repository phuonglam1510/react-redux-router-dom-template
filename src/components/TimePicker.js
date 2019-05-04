import React, { Component } from 'react';
import TimeKeeper from 'react-timekeeper';

import '../styles/components/TimePicker.scss';

class TimePicker extends Component {
    render() {
        const { containerStyle, visible, onTimeChanged, time } = this.props;
        return (
            <div className={"time-picker" + (visible ? ' visible' : '')} style={{ ...containerStyle }}>
                <TimeKeeper switchToMinuteOnHourSelect={true} time={time} onDoneClick={onTimeChanged} />
            </div>
        );
    }
}



export default TimePicker;