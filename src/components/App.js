import React, { Component } from 'react';
import TrainingGrid from './TrainingGrid';
import marathon_boston_dave from '../data/marathon_boston_dave.json'; 
import marathon_dave from '../data/marathon_dave.json'; 

import PropTypes from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

class App extends Component {

  
  
  constructor(props) {
    super(props);
      
    const { cookies } = props;
    var file = this.onSelectFile(cookies.get('selectedFile') || '');


     this.state = {
       race : cookies.get('race') || '',
       desire : cookies.get('desire') || '',
       title : file.title,
       weeks: file.weeks,
       selectedFile: cookies.get('selectedFile') || '',
     }
    
    }
  
  onChange(e){

    let newState = Object.assign({}, this.state);
    newState["desire"] = e.target.value;
    this.setState(newState);

  }

  onBlur(){
    const { cookies } = this.props;
 
    cookies.set('desire', this.state.desire, { path: '/' });
  }

  onProgramChange(e){
    
    var file = e.target.value;
    var fileContent = this.onSelectFile(file);

    const { cookies } = this.props;
 
    cookies.set('selectedFile', file, { path: '/' });
    
    let newState = Object.assign({}, this.state);
    newState.selectedFile = file;
    newState.weeks = fileContent.weeks;
    newState.title = fileContent.title;

    this.setState(newState);
  }

  onRaceChange(e){
    var race = e.target.value;
    const { cookies } = this.props;
 
    cookies.set('race', race, { path: '/' });

    this.setState({race});
  }


  onSelectFile(fileName){
    switch(fileName){
      case 'marathon_boston_dave.json':{
          return marathon_boston_dave;
      }
      case 'marathon_dave.json':{
        return marathon_dave;
      }
      default:{
        return {weeks:[],title:''};
      }
    }
  }
  
  render() {
    var {state} = this;
    return (
      <div className="App container well">
        <center style={{width:'50%',margin:'0 auto'}}>
        <div className="form-horizontal">
        <div class="form-group">
             <label className="col-md-4 control-label" htmlFor="id_race">Race : </label> 
             <div class="col-sm-8">
              <select value={state.race} id="id_race" onChange={this.onRaceChange.bind(this)}  className="form-control">
                  <option value="">Select Race</option>
                  <option value="Nov 1">Nov 1</option>
                  <option value="Nov 2">Nov 2</option>
              </select>
             </div>
          </div>
          <div class="form-group">
              <label className="col-md-4 control-label" htmlFor="id_desire">Desire Finish time : </label>
              <div class="col-sm-8">
                <input id="id_desire" onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} value={state.desire} className="form-control  " />
            </div>
          </div>
          <div class="form-group">
           
            <label className="col-md-4 control-label" htmlFor="s_trainingProgram"> Training Program Name : </label>
            <div class="col-sm-8">  
              <select value={state.selectedFile} id="s_trainingProgram" onChange={this.onProgramChange.bind(this)}  className="form-control">
                  <option value="">Select</option>
                  <option value="marathon_dave.json">marathon dave</option>
                  <option value="marathon_boston_dave.json">marathon Boston dave</option>
              </select>
            </div>
          </div>
        </div>
          
        </center>
        <TrainingGrid weeks={state.weeks}/>
      </div>
    );
  }
}

App.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired
} 

export default withCookies(App);
