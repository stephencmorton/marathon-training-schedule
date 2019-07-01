import React, { Component } from 'react';
import WeekRow from './WeekRow';
import DModal from './DModal';

import PropTypes from 'prop-types';
import moment  from 'moment';


class TrainingGrid extends Component {
    
    constructor(props, context) {
        super(props, context);
        
        this.handler = this.handler.bind(this);
        this.cellClickHandler = this.cellClickHandler.bind(this);
        this.calculateDate = this.calculateDate.bind(this);
        //this.raceDow = moment(this.props.raceDate).isoWeekday(); //Monday=1, Sunday=7

	var raceday_m =  moment(this.props.raceDate);
        this.raceDow = raceday_m.isoWeekday(); //Monday=1, Sunday=7

	this.numWeeks = this.props.weeks.length-1;
	var raceWeekMonday_m = raceday_m.subtract(this.raceDow -1, 'days');
	var trainingStart_m  = raceWeekMonday_m.subtract(this.numWeeks, 'weeks');
	this.todayWeek        = moment().isoWeek() - trainingStart_m.isoWeek();
	
        this.state = {
            show: false,
            data: '',
            startedDate:''
        };
    }
    
    handler(state) {
        this.setState({ show: state });
    }

    cellClickHandler(state,desc) {
        this.setState({ show: state, data:desc });
    }

    calculateDate(i){
        var date = moment(this.props.raceDate).add((8-this.raceDow),'days').subtract(i, 'weeks').format("MMM DD YYYY");

        return date;
    }

    render() {
        var {props,state} = this;

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
                      return <WeekRow key={i} week= {week} theme={props.themes[i]} onClickCell={this.cellClickHandler} weekNum={i} raceDow={this.raceDow} raceWeek={this.numWeeks} todayWeek={this.todayWeek} date={this.calculateDate((props.weeks.length)-i)}  />
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
