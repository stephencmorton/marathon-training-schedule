import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment  from 'moment';

class WeekRow extends Component {

  isEmptyOrNull(value){
    return ['',undefined,null].indexOf(value) !== -1 ? '-' : value;
  }


  isPreviousDate(startedDate,i){      
        
    //let cellDate =;
    
    return moment(startedDate).add(i,'days').isBefore(moment(), 'day');  //date === moment().format("MMM DD YY") //moment(date).isSame(moment(),"days");
  }


  isTodayDate(startedDate,i){      
        
    //let cellDate =;
    
    return moment(startedDate).add(i,'days').isSame(moment(), 'day');  //date === moment().format("MMM DD YY") //moment(date).isSame(moment(),"days");
  }
  
  render() {
    var {props} = this;
    return (
      <tr>
          <th>{props.date}</th>
          {props.week.map((week,i) => {
              return <td key={i}  className={this.isTodayDate(props.date,i) ? 'today' : this.isPreviousDate(props.date,i) ? 'previousDate' : '' } onClick={props.onClickCell.bind(this,true,this.isEmptyOrNull(week.description))}>{props.date} {this.isEmptyOrNull(week.summary)}</td>
          })}
      </tr>
    );
  }
}

WeekRow.propTypes = {
  date : PropTypes.string.isRequired,
  week : PropTypes.array.isRequired,
  onClickCell : PropTypes.func.isRequired
};

export default WeekRow;
