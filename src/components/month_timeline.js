import React, { Component } from 'react';
import moment from 'moment';
import { Label } from 'react-bootstrap';

class MonthTimeline extends Component {
  renderTimeline = (y, m, d) => {
    let _timeline = [];
    let _days = moment(`${y}-${m}`, 'YYYY-MM').daysInMonth();
    for (let _d = 1; _d <= _days; _d++) {
      _timeline.push(
        <span key={_d}>
          <Label
            bsStyle={_d === Number(d) ? 'info' : 'primary'}
            onClick={() => this.props.onDaySelect(_d)}
          >
            {_d}
          </Label>{' '}
        </span>
      );
    }
    return _timeline;
  };

  render = () => {
    const { year, month, day } = this.props;
    return <div>{this.renderTimeline(year, month, day)}</div>;
  };
}

export default MonthTimeline;
