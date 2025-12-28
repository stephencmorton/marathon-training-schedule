import React, { useState, useMemo, useCallback } from 'react';
import WeekRow from './WeekRow';
import DModal from './DModal';

// import PropTypes from 'prop-types';

import './DateFuncs';

function TrainingGrid(props) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState('');

    const calculateParms = useMemo(() => {
        const raceday_d = new Date(props.raceDate);
        const raceDow = raceday_d.getIsoWeekday(); // Monday=1, Sunday=7
        const numWeeks = props.weeks.length - 1;
        const raceWeekMonday_d = raceday_d.addDays(-(raceDow - 1));
        const trainingStart_d = raceWeekMonday_d.addWeeks(-numWeeks);
        const todayYear = new Date().getFullYear();
        const todayWeek = new Date().getWeek() - trainingStart_d.getWeek() + todayYear;
        return { raceDow, numWeeks, todayYear, todayWeek, raceWeekMonday_d};
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
        // Data of Monday for week i
        return formatDate(calculateParms.raceWeekMonday_d.addWeeks(-i));
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
                      schedule={week}
                      theme={props.themes[i]}
                      onClickCell={cellClickHandler}
                      weekIndex={i+1}
                      weekNum={i + calculateParms.todayYear}
                      raceDow={calculateParms.raceDow}
                      raceWeek={calculateParms.numWeeks + calculateParms.todayYear}
                      todayWeek={calculateParms.todayWeek}
                      dateFmt={calculateDate((props.weeks.length)-i)}
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
