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

    isPreviousWeek(startedDate){
        var i = 7;
        return moment(startedDate).add(i,'days').isBefore(moment(), 'day');  //date === moment().format("MMM DD YY") //moment(date).isSame(moment(),"days");
    }


    isTodayDate(startedDate,i){      
        
        //let cellDate =;
        
        return moment(startedDate).add(i,'days').isSame(moment(), 'day');  //date === moment().format("MMM DD YY") //moment(date).isSame(moment(),"days");
    }

    isRaceDay(startedDate,i) {
        return moment(this.props.raceDate).isSame(moment(startedDate).add(i,'days'), 'day');  //date === moment().format("MMM DD YY") //moment(date).isSame(moment(),"days");
    }

    isThisWeek(startedDate) {
        var numDays = moment().diff(moment(startedDate),'days');
        return (numDays < 8 && numDays >= 1);
    }


    render() {
        var {props} = this;
        var weeknum = Number(this._reactInternalFiber.key) + 1;
        return (
            <tr >
              <th className={this.isThisWeek(props.date) ? 'thisWeek' : this.isPreviousWeek(props.date) ? 'previousDate' : ''} >{weeknum} - {props.date} <br/><span class="theme">&nbsp;&nbsp;&nbsp;{props.theme}</span></th>
              {props.week.map((week,i) => {
                  var summary = week.summary;
                  if (week.summary !== week.description) {summary = week.summary + " ...";}
                  return <td key={i}  className={ this.isRaceDay(props.date,i) ? 'raceDay' : this.isTodayDate(props.date,i) ? 'today' : this.isThisWeek(props.date) ? 'thisWeek' : this.isPreviousWeek(props.date) ? 'previousDate' : '' } onClick={props.onClickCell.bind(this,true,this.isEmptyOrNull(week.description))}>
                               { this.isRaceDay(props.date,i) ? "Race" : this.isEmptyOrNull(summary)}</td>
              })}
            </tr>
        );
    }
}

WeekRow.propTypes = {
    date : PropTypes.string.isRequired,
    week : PropTypes.array.isRequired,
    theme: PropTypes.string.isRequired,
    raceDate :   PropTypes.string.isRequired,
    onClickCell : PropTypes.func.isRequired
};

export default WeekRow;
