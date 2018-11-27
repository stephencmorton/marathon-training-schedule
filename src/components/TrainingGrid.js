import React, { Component } from 'react';
import WeekRow from './WeekRow';
import DModal from './DModal';

import PropTypes from 'prop-types';


class TrainingGrid extends Component {
    
    constructor(props, context) {
        super(props, context);
    
        this.handler = this.handler.bind(this);
        this.cellClickHandler = this.cellClickHandler.bind(this);
        
        this.state = {
          show: false,
          data: ''
        };
      }
    
    handler(state) {
        this.setState({ show: state });
    }

    cellClickHandler(state,desc) {
        this.setState({ show: state, data:desc });
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
                            <th>Web</th>
                            <th>Thur</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>  
                    </thead>  


                    <tbody>
                        {props.weeks.map((week,i) => {
                            return <WeekRow week= {week} onClickCell={this.cellClickHandler}  date={'Nov '+(i+1)}  />
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
    weeks : PropTypes.arrayOf(PropTypes.arrayOf).isRequired
};

export default TrainingGrid;