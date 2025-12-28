import React from 'react';
// import PropTypes from 'prop-types';
import './DateFuncs';

function isEmptyOrNull(value){
    return ['', undefined, null].indexOf(value) !== -1 ? '-' : value;
}

const todayDow = new Date().getIsoWeekday();

function WeekRow(props) {
  // compute header class more readably
  let headerClass = '';
  if (props.weekNum === props.todayWeek) {
    headerClass = 'thisWeek';
  } else if (props.weekNum < props.todayWeek) {
    headerClass = 'previousDate';
  }

  return (
    <tr>
      <th className={headerClass} >{props.weekIndex} - {props.dateFmt} <br/><span className="theme">&nbsp;&nbsp;&nbsp;{props.theme}</span></th>
      {props.schedule.map((week,i) => {
        let summary = week.summary;
        if (week.summary !== week.description) { summary = week.summary + " ..."; }

        summary = isEmptyOrNull(summary);
        if (props.weekNum === props.raceWeek && props.raceDow === (i+1))
        {  
          summary = 'Race';
        }
        
        let cellClass = '';
        if (props.weekNum === props.raceWeek && props.raceDow === (i+1)) {
          cellClass = 'raceDay';
        } else if (props.weekNum === props.todayWeek && todayDow === (i+1)) {
          cellClass = 'today';
        } else if (props.weekNum === props.todayWeek) {
          cellClass = 'thisWeek';
        } else if (props.weekNum < props.todayWeek) {
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
//     raceDow: PropTypes.number.isRequired,
//     raceWeek: PropTypes.number.isRequired,
//     weekNum : PropTypes.number.isRequired,
//     todayWeek : PropTypes.number.isRequired,
//     dateFmt : PropTypes.string.isRequired,
//     schedule : PropTypes.array.isRequired,
//     theme: PropTypes.string.isRequired,
//     onClickCell : PropTypes.func.isRequired
// };

export default WeekRow;
