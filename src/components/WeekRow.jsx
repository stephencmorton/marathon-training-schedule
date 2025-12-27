import React from 'react';
// import PropTypes from 'prop-types';
import './DateFuncs';

function isEmptyOrNull(value){
    return ['', undefined, null].indexOf(value) !== -1 ? '-' : value;
}

function WeekRow(props) {
    const todayDow = (function(){ let d = new Date().getDay(); return d === 0 ? 7 : d; })();
    const weeknum = props.weekNum;

    return (
        <tr>
          <th className={(props.weekNum === props.todayWeek) ? 'thisWeek' : (props.weekNum < props.todayWeek) ? 'previousDate' : ''} >{weeknum} - {props.date} <br/><span className="theme">&nbsp;&nbsp;&nbsp;{props.theme}</span></th>
          {props.week.map((week,i) => {
              let summary = week.summary;
              if (week.summary !== week.description) { summary = week.summary + " ..."; }
              const cellClass = (props.weekNum === props.raceWeek && props.raceDow === (i+1)) ? 'raceDay' : (props.weekNum === props.todayWeek && todayDow === (i+1)) ? 'today' : (props.weekNum === props.todayWeek) ? 'thisWeek' : (props.weekNum < props.todayWeek) ? 'previousDate' : '';
              return (
                  <td
                    key={i}
                    className={cellClass}
                    onClick={() => props.onClickCell(true, isEmptyOrNull(week.description))}
                  >
                    {(props.weekNum === props.raceWeek && props.raceDow === (i+1)) ? 'Race' : isEmptyOrNull(summary)}
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
//     date : PropTypes.string.isRequired,
//     week : PropTypes.array.isRequired,
//     theme: PropTypes.string.isRequired,
//     onClickCell : PropTypes.func.isRequired
// };

export default WeekRow;
