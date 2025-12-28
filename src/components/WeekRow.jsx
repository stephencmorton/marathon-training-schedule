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
      {props.schedule.map((day,i) => {
        let summary = day.summary;
        if (day.summary !== day.description) { summary = day.summary + " ..."; }

        summary = isEmptyOrNull(summary);

        let cellClass = '';
        if (props.weekIndex < props.todayWeekIndex) {
          cellClass = 'previousDate';
        }
        else {
          if (props.weekIndex === props.todayWeekIndex) {
            cellClass = 'thisWeek';
            if (props.todayDow === (i + 1)) {
              cellClass = 'today';
            }
          }

          if (props.weekIndex === props.raceWeekIndex) {
            if (props.raceDow === (i + 1)) {
              summary = 'Race';
              cellClass = 'raceDay';
            }
            else if (props.raceDow < (i + 1)) {
              summary = '';
              cellClass = 'postRace';
            }
          }
        }

        return (
          <td
          key={i}
          className={cellClass}
          onClick={() => props.onClickCell(true, isEmptyOrNull(day.description))}
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
