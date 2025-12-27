import React, { Component } from 'react';
import WeekRow from './WeekRow';
import DModal from './DModal';

import PropTypes from 'prop-types';

import './DateFuncs';

class TrainingGrid extends Component {

    constructor(props, context) {
        super(props, context);

        this.handler = this.handler.bind(this);
        this.cellClickHandler = this.cellClickHandler.bind(this);
        this.calculateDate = this.calculateDate.bind(this);
        //this.calculateparms();

        this.state = {
            show: false,
            data: '',
            startedDate:''
        };
    }

    calculateparms()
    {
      var raceday_m = new Date(this.props.raceDate);
      this.raceDow = raceday_m.getIsoWeekday(); //Monday=1, Sunday=7

      this.numWeeks = this.props.weeks.length-1;
      // var raceWeekMonday_m = raceday_m.subtract(this.raceDow -1, 'days');
      
      var raceWeekMonday_m = raceday_m.addDays(-(this.raceDow - 1));
      // raceWeekMonday_m.setDate(raceday_m.getDate() - (this.raceDow - 1));
     
      var trainingStart_m = raceWeekMonday_m.addWeeks(-this.numWeeks);

      this.todayYear = new Date().getFullYear();
      this.todayWeek = new Date().getWeek() - trainingStart_m.getWeek() + this.todayYear;

    }

    handler(state) {
        this.setState({ show: state });
    }

    cellClickHandler(state,desc) {
        this.setState({ show: state, data:desc });
    }


    formatDate(date) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    }
    calculateDate(i){
        
        const baseDate = new Date(this.props.raceDate);

        // Add (8 - this.raceDow) days
        baseDate.setDate(baseDate.getDate() + (8 - this.raceDow));

        // Subtract i weeks
        baseDate.setDate(baseDate.getDate() - (i * 7));

        // Format like "MMM DD YYYY"
        const formattedDate = this.formatDate(baseDate);
        return formattedDate;
    }

    render() {
        var {props,state} = this;

        this.calculateparms();
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
                      return <WeekRow key={i} week= {week} theme={props.themes[i]} onClickCell={this.cellClickHandler} weekIndex={i+1} weekNum={i + this.todayYear} raceDow={this.raceDow} raceWeek={this.numWeeks + this.todayYear} todayWeek={this.todayWeek} date={this.calculateDate((props.weeks.length)-i)}  />
                  })}
                </tbody>
              </table>

              {state.show &&
               <DModal onHandler={this.handler} show={state.show} data={state.data} />
              }
            </div>
        );
    }
}

TrainingGrid.propTypes = {
    weeks : PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
    themes: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
    raceDate : PropTypes.string.isRequired
};

export default TrainingGrid;
