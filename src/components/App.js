import React, { Component } from 'react';
import TrainingGrid from './TrainingGrid';

import {Vdot} from './Vdot.js';

import h_dave_advanced from '../data/dave_advanced_half.json';
import h_dave_basic from '../data/dave_basic_half.json';
import m_dave_advanced from '../data/dave_advanced_2018.json';
import m_dave_basic from '../data/dave_first_timer.json';
import m_dave_int from '../data/dave_intermediate.json';
import m_dave_boston from '../data/marathon_boston_dave.json';
import m_rlrf        from '../data/marathon_rlrf.json';

import Races from '../data/Races';

//import PropTypes from 'prop-types';

//import { withCookies, Cookies } from 'react-cookie';

class App extends Component {

    constructor(props) {
        super(props);
//        const { cookies } = props;
        var file = localStorage.getItem('selectedFile') || '';
        var gp   = localStorage.getItem('gp') || '4:00';
        var dist = 42195;
        if (String(file).includes('half')) { dist=21098;}
        var vobj = new Vdot(true, dist, gp + ":00");
	var plan = this.onSelectFile(file);
        this.state = {
            race : localStorage.getItem('race') || '',
            races : Races,
            distance: dist,
            gp : gp,  /*Goal Pace*/
            title : plan.title,
            weeks:  plan.weeks,
            themes: plan.themes,
            selectedFile: file,
            paces:  vobj.makeCalculations(),
        }

    }

    onGPChange(e){

        let newState = Object.assign({}, this.state);
        var vobj = new Vdot(true, this.state.distance, e.target.value + ":00");
        newState["gp"] = e.target.value;
        newState["paces"] = vobj.makeCalculations();
        this.setState(newState);

    }

    onGPBlur(){
//        const { cookies } = this.props;

        localStorage.setItem('gp', this.state.gp);
    }

    onProgramChange(e){

        var file = e.target.value;
        var fileContent = this.onSelectFile(file);

        var dist = 42195;
        if (String(file).includes('half')) { dist=21098;}
        var vobj = new Vdot(true, dist, this.state.gp + ":00");

//        const { cookies } = this.props;

        localStorage.setItem('selectedFile', file);

        let newState = Object.assign({}, this.state);
        newState.selectedFile = file;
        newState.weeks = fileContent.weeks;
        newState.themes= fileContent.themes;
        newState.title = fileContent.title;
        newState.paces = vobj.makeCalculations();
        newState.distance =dist;


        this.setState(newState);
    }

    onRaceChange(e){
        var race = e.target.value;
//        const { cookies } = this.props;

        localStorage.setItem('race', race);

        this.setState({race});
    }


    onSelectFile(fileName){
        switch(fileName){
        case 'marathon_boston_dave.json':{
            return m_dave_boston;
        }
        case 'dave_advanced.json':{
            return m_dave_advanced;
        }
        case 'dave_intermediate.json':{
            return m_dave_int;
        }
        case 'dave_first_timer.json':{
            return m_dave_basic;
        }
        case 'marathon_rlrf.json':{
            return m_rlrf;
        }
        case 'dave_advanced_half.json':{
            return h_dave_advanced;
        }
        case 'dave_basic_half.json':{
            return h_dave_basic;
        }
        default:{
            return {weeks:[],title:''};
        }
        }
    }

    raceSpliter(race,index){
        return race.split('-')[index]
    }

    render() {
        var {state} = this;
        return (
            <div className="App container well">
              <center style={{width:'50%',margin:'0 auto'}}>
                <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="id_race">Race : </label>
                    <div className="col-sm-8">
                      <select value={state.race} id="id_race" onChange={this.onRaceChange.bind(this)}  className="form-control">
                        <option value="">Select Race</option>
                        {
                            state.races.map((r,i) => {
                                return  <option key={i} value={this.raceSpliter(r,1)}>{r}</option>
                            })
                        }

                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="id_gp">Goal Finish time : </label>
                    <div className="col-sm-8">
                      <input id="id_gp" onChange={this.onGPChange.bind(this)} onBlur={this.onGPBlur.bind(this)} value={state.gp} className="form-control" placeholder="h:mm" pattern="\d:\d\d" />
                    </div>
                  </div>
                  <div className="form-group">

                    <label className="col-md-4 control-label" htmlFor="s_trainingProgram"> Training Program Name : </label>
                    <div className="col-sm-8">
                      <select value={state.selectedFile} id="s_trainingProgram" onChange={this.onProgramChange.bind(this)}  className="form-control">
                        <option value="">Select</option>
                        <option value="dave_advanced.json">Full: Dave Advanced</option>
                        <option value="dave_intermediate.json">Full: Dave Intermediate</option>
                        <option value="dave_first_timer.json">Full: Dave First Timer</option>
                        <option value="marathon_boston_dave.json">Full: Dave Special Boston Program</option>
                        <option value="marathon_rlrf.json">Full: FIRST RLRF 3plus2</option>
                        <option value="dave_advanced_half.json">Half: Dave Advanced</option>
                        <option value="dave_basic_half.json">Half: Dave Basic</option>
                      </select>
                    </div>
                  </div>
                </div>

              </center>
              {
                  state.race !== "" && state.selectedFile !== "" &&
                      <TrainingGrid weeks={state.weeks}  raceDate={state.race} themes={state.themes}/>
              }


              <table className="table table-bordered">

                <thead>
                  <th colspan="5"><center>Paces</center></th>
                  <tr>
                    <th>Acronym</th>
                    <th>Name</th>
                    <th>Pace</th>
                    <th>Zone (1-5)</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>E</td>
                    <td>Easy</td>
                    <td class="pace">{state.paces.easy}</td>
                    <td>2</td>
                    <td>These are days of semi-rest, nevertheless, as the weekend mileage builds, the weekday mileage also builds.<br/>
                    </td> </tr>
                  <tr>
                    <td>LR</td>
                    <td>Long Run</td>
                    <td class="pace">{state.paces.xlong}</td>
                    <td>2</td>
                    <td>Pace for your long runs. Normally GP + 20-30s
                    </td>
                  </tr>
                  <tr>
                    <td>GP<br/>MP</td>
                    <td>Goal Pace<br/>Marathon P</td>
                    <td class="pace">{state.paces.gp}</td>
                    <td>Mid-2</td>
                    <td>Your Goal Pace for your marathon race.<br/>
                      HMP is typically 6-10s slower than your T pace.
                    </td>
                  </tr>
                  <tr>
                    <td>T</td>
                    <td>Tempo / <br/>Threshold</td>
                    <td class="pace">{state.paces.tempo}</td>
                    <td>3/4 boundary</td>
                    <td>Tempo runs help you improve your endurance, running economy and your running form.
                      They are sometimes described as 'threshold' or 'hard but controlled' runs, and they will help
                      you prepare for races of 10K to the marathon. Tempo sessions generally fall into one of two
                      categories: steady runs of 3 to 10 km; or long intervals (5-15min) with short recoveries (1-3min).
                      Your Lactate Threshold is by definition, the boundary between Zones 3 and 4
                    </td>
                  </tr>
                  <tr>
                    <td>SI</td>
                    <td>Speed Interval</td>
                    <td class="pace">{state.paces.speed} - {state.paces.maximum}</td>
                    <td>High 4</td>
                    <td>
		      Speed intervals are to stress your aerobic power. The faster pace is for 400s and you can adjust as required for longer distances.
                      Recovery is equal duration of the repetition (e.g., 3min interval, 3min rest).<br/>
                      For 800m "Yasso" intervals, see below.
                    </td>
                  </tr>
                  <tr>
                    <td>Y</td>
                    <td>Yasso Intervals</td>
                    <td class="pace">{state.paces.yasso}</td>
                    <td>High 4</td>
                    <td>
		      Run your 800 repeats using the same numbers as your marathon time. In other words, if you run a 3-hour marathon,
	              you do the 800s in 3 minutes. A 3:10 marathoner does 3:10 repeats; 3:20 marathoner, 3:20 repeats, etc.
		      It seems silly, but it works.<br/>
                      Recovery is equal duration of the repetition (e.g., 3min interval, 3min rest).<br/>
                    </td>
                  </tr>
                  <tr>
                    <td>TUT</td>
                    <td>Total Uphill Time       </td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>
                      The total number of minutes you spend running semi-vigorously up inclines;
                      effort should feel like a 10K race at the top.  Could be repeats up the same hill or total uphill time over a hilly loop.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        );
    }
}

/*App.propTypes = {
    cookies: PropTypes.object.isRequired
}
*/

export default App;
