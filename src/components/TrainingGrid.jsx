import React, { useState, useMemo, useCallback } from 'react';
import WeekRow from './WeekRow';
import DModal from './DModal';

// import PropTypes from 'prop-types';

import './DateFuncs';

function TrainingGrid(props) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState('');

    const calculateParms = useMemo(() => {
        const raceday_m = new Date(props.raceDate);
        const raceDow = raceday_m.getIsoWeekday(); // Monday=1, Sunday=7
        const numWeeks = props.weeks.length - 1;
        const raceWeekMonday_m = raceday_m.addDays(-(raceDow - 1));
        const trainingStart_m = raceWeekMonday_m.addWeeks(-numWeeks);
        const todayYear = new Date().getFullYear();
        const todayWeek = new Date().getWeek() - trainingStart_m.getWeek() + todayYear;
        return { raceDow, numWeeks, todayYear, todayWeek };
    }, [props.raceDate, props.weeks]);

    const handler = useCallback((state) => {
        setShow(state);
    }, []);

    const cellClickHandler = useCallback((state, desc) => {
        setShow(state);
        setData(desc);
    }, []);

    function formatDate(date) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    }

    function calculateDate(i){
        const baseDate = new Date(props.raceDate);
        baseDate.setDate(baseDate.getDate() + (8 - calculateParms.raceDow));
        baseDate.setDate(baseDate.getDate() - (i * 7));
        return formatDate(baseDate);
    }

    return (
        <div className="container-fluid">
          <table className="table table-bordered">

            <thead>
              <tr>
                <th></th>
                <th>Mon</th>
                <th>Tues</th>
                <th>Wed</th>
                <th>Thur</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
              </tr>
            </thead>

            <tbody>
              {props.weeks.map((week,i) => {
                  return (
                    <WeekRow
                      key={i}
                      week={week}
                      theme={props.themes[i]}
                      onClickCell={cellClickHandler}
                      weekIndex={i+1}
                      weekNum={i + calculateParms.todayYear}
                      raceDow={calculateParms.raceDow}
                      raceWeek={calculateParms.numWeeks + calculateParms.todayYear}
                      todayWeek={calculateParms.todayWeek}
                      date={calculateDate((props.weeks.length)-i)}
                    />
                  );
              })}
            </tbody>
          </table>

          {show &&
           <DModal onHandler={handler} show={show} data={data} />
          }
        </div>
    );
}

// TrainingGrid.propTypes = {
//     weeks : PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
//     themes: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
//     raceDate : PropTypes.string.isRequired
// };

export default TrainingGrid;
