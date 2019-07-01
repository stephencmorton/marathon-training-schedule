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
        this.todayDate = this.todayDate.bind(this);

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
      
      var date ;
      if( moment(this.props.raceDate).day() === 6)
       date = moment(this.props.raceDate).add(2,'days').subtract(i, 'weeks').format("MMM DD YY");
      else 
       date = moment(this.props.raceDate).add(1,'days').subtract(i, 'weeks').format("MMM DD YY");

      return date;
    }

    todayDate(startedDate,i){      
        
      //let cellDate =;
      
      return moment(moment(this.calculateDate(startedDate)).add(i,'days').format("MMM DD YY")).isSame(moment(), 'day');  //date === moment().format("MMM DD YY") //moment(date).isSame(moment(),"days");
    }

    render() {
        var {props,state} = this;

        return (
            <div>
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
                            return <WeekRow key={i} week= {week} onClickCell={this.cellClickHandler}  date={this.calculateDate((props.weeks.length)-i)}  />
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
    raceDate : PropTypes.string.isRequired
};

export default TrainingGrid;
