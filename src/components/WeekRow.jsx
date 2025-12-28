import React from 'react';
// import PropTypes from 'prop-types';
import './DateFuncs';

function isEmptyOrNull(value){
    return ['', undefined, null].indexOf(value) !== -1 ? '-' : value;
}

function WeekRow(props) {
  // compute header class more readably
  let headerClass = '';
  if (props.weekIndex === props.todayWeekIndex) {
    headerClass = 'thisWeek';
  } else if (props.weekIndex < props.todayWeekIndex) {
    headerClass = 'previousDate';
  }

  return (
    <tr>
      <th className={headerClass} >{props.weekIndex} - {props.dateFmt} <br/><span className="theme">&nbsp;&nbsp;&nbsp;{props.theme}</span></th>
      {props.schedule.map((week,i) => {
        let summary = week.summary;
        if (week.summary !== week.description) { summary = week.summary + " ..."; }

        summary = isEmptyOrNull(summary);
        if (props.weekIndex === props.raceWeekIndex && props.raceDow === (i+1))
        {  
          summary = 'Race';
        }
        
        let cellClass = '';
        if (props.weekIndex === props.raceWeekIndex& props.raceDow === (i+1)) {
          cellClass = 'raceDay';
        } else if (props.weekIndex === props.raceWeekIndex& props.raceDow < (i+1)) {
          summary= '';
        } else if (props.weekIndex === props.todayWeekIndex && props.todayDow === (i+1)) {
          cellClass = 'today';
        } else if (props.weekIndex === props.todayWeekIndex) {
          cellClass = 'thisWeek';
        } else if (props.weekIndex < props.todayWeekIndex) {
          cellClass = 'previousDate';
        }
        
        return (
          <td
          key={i}
          className={cellClass}
          onClick={() => props.onClickCell(true, isEmptyOrNull(week.description))}
          >
          {summary}
          </td>
        );
      })}
    </tr>
  );
}

// WeekRow.propTypes = {
//     dateFmt : PropTypes.string.isRequired,
//     raceDow: PropTypes.number.isRequired,
//     raceWeekIndex: PropTypes.number.isRequired,
//     schedule : PropTypes.array.isRequired,
//     theme: PropTypes.string.isRequired,
//     todayDow: PropTypes.number.isRequired,
//     todayWeekIndex : PropTypes.number.isRequired,
//     weekIndex : PropTypes.number.isRequired,
//     onClickCell : PropTypes.func.isRequired
// };                      
export default WeekRow;
