import React, { useState, useMemo, useCallback } from 'react';
import WeekRow from './WeekRow';
import DModal from './DModal';

// import PropTypes from 'prop-types';

import './DateFuncs';
import { weekDifference, isoWeekStart } from './DateFuncs';

function TrainingGrid(props) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState('');

    const calculateParms = useMemo(() => {
        const raceDow   = props.raceDate.getIsoWeekday(); // Monday=1, Sunday=7
        const numWeeks  = props.weeks.length;
        const trainingStartDate = isoWeekStart(props.raceDate).addWeeks(-numWeeks+1);
        const todayWeekIndex = numWeeks - weekDifference(props.raceDate, props.today) ;
        const todayDow = props.today.getIsoWeekday();
        return { raceDow, numWeeks, todayWeekIndex, todayDow, trainingStartDate};
    }, [props.raceDate, props.weeks, props.today]);

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

    function calculateDate(weekIndex){
        // Data of Monday for week i
        return formatDate(calculateParms.trainingStartDate.addWeeks(weekIndex));
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
                      dateFmt={calculateDate(i)}
                      raceDow={calculateParms.raceDow}
                      raceWeekIndex={calculateParms.numWeeks}
                      schedule={week}
                      theme={props.themes[i]}
                      todayDow={calculateParms.todayDow}
                      todayWeekIndex={calculateParms.todayWeekIndex}
                      weekIndex={i+1}
                      onClickCell={cellClickHandler}
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
//     raceDate : PropTypes.instanceOf(Date).isRequired
//     today : PropTypes.instanceOf(Date).isRequired
// };

export default TrainingGrid;
