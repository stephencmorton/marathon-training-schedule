import React, { Component } from 'react';
import PropTypes from 'prop-types';


class WeekRow extends Component {

  isEmptyOrNull(value){
    return ['',undefined,null].indexOf(value) !== -1 ? '-' : value;
  }
  
  render() {
    var {props} = this;
    return (
      <tr>
          <th>{props.date}</th>
          {props.week.map((week,i) => {
            return <td onClick={props.onClickCell.bind(this,true,this.isEmptyOrNull(week.description))}>{this.isEmptyOrNull(week.summary)}</td>
          })}
      </tr>
    );
  }
}

WeekRow.propTypes = {
  date : PropTypes.string.isRequired,
  Week : PropTypes.array.isRequired,
  onClickCell : PropTypes.func.isRequired
};

export default WeekRow;