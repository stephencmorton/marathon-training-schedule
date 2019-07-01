import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WeekRow extends Component {

        constructor(props, context) {
            super(props, context);
	    this.today_dow = new Date().getDay();
	    if (this.today_dow === 0) {this.today_dow = 7;}
    }

    isEmptyOrNull(value){
        return ['',undefined,null].indexOf(value) !== -1 ? '-' : value;
    }


    render() {
        var {props} = this;
        var weeknum = Number(this._reactInternalFiber.key) + 1;
        return (
            <tr >
              <th className={(props.weekNum === props.todayWeek) ? 'thisWeek' : (props.weekNum < props.todayWeek) ? 'previousDate' : ''} >{weeknum} - {props.date} <br/><span class="theme">&nbsp;&nbsp;&nbsp;{props.theme}</span></th>
              {props.week.map((week,i) => {
                  var summary = week.summary; /* week.description;*/ /*.replace(',',"<p>");*/
                  if (week.summary !== week.description) {summary = week.summary + " ...";}
		  return <td key={i} className={ (props.weekNum === props.raceWeek && props.raceDow === (i+1)) ? 'raceDay' : (props.weekNum === props.todayWeek && this.today_dow === (i+1)) ? 'today' : (props.weekNum === props.todayWeek) ? 'thisWeek' : (props.weekNum < props.todayWeek) ? 'previousDate' : '' } onClick={props.onClickCell.bind(this,true,this.isEmptyOrNull(week.description))}>
                      { (props.weekNum === props.raceWeek && props.raceDow === (i+1)) ? "Race" : this.isEmptyOrNull(summary)}</td>
              })}
            </tr>
        );
    }
}

WeekRow.propTypes = {
    raceDow: PropTypes.number.isRequired,
    raceWeek: PropTypes.number.isRequired,
    weekNum : PropTypes.number.isRequired,
    todayWeek : PropTypes.number.isRequired,
    date : PropTypes.string.isRequired,
    week : PropTypes.array.isRequired,
    theme: PropTypes.string.isRequired,
    onClickCell : PropTypes.func.isRequired
};

export default WeekRow;
