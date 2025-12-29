import React, { useState, useEffect } from 'react';
import TrainingGrid from './TrainingGrid';

import {Vdot} from './Vdot.js';

import { loadRaces, defaultRaces, marathon_default} from '../data/Races';

function App() {

    const MARATHON_DIST = 42195;
    const HALF_DIST    = 21098;

    // load a program JSON by filename: try /programs/<file> else fall back to bundled default
    async function loadProgram(filename) {
      if (!filename) return  marathon_default ;
      try {
        const res = await fetch(`/programs/${filename}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object') return data;
        }
      } catch (e) {
        // ignore and fall back
      }
      return marathon_default;
    }

    const initial = (() => {
        const file = localStorage.getItem('selectedFile') || '';
        var gp = '4:00';
        {
          let read_gp = localStorage.getItem('gp');
          if (/^\d:\d\d$/.test(read_gp)) {
              gp = read_gp
          }
        }
        let dist = MARATHON_DIST;
        if (String(file).includes('half')) { dist=HALF_DIST; }
        const vobj = new Vdot(true, dist, gp + ":00");
        const plan = { weeks: [], title: '', themes: [] };
        return {
            race: localStorage.getItem('race') || '',
            races: defaultRaces,
            distance: dist,
            gp: gp,
            title: plan.title,
            weeks: plan.weeks || [],
            themes: plan.themes || [],
            selectedFile: file,
            paces: vobj.makeCalculations(),
        };
    })();

    const [state, setState] = useState(initial);
    const [programList, setProgramList] = useState([]);

    // load editable races list from /races.json in public/ (overrides defaultRaces)
    useEffect(() => {
      let mounted = true;
      loadRaces().then(r => { if (mounted) setState(prev => ({ ...prev, races: r })); }).catch(() => {});
      return () => { mounted = false; };
    }, []);

    // load editable program list from /programs/programs.json
    useEffect(() => {
      let mounted = true;
      
      fetch('/programs/programs.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(programs => {
        if (!mounted) return;
        if (Array.isArray(programs) && programs.length) {
          programs.sort((a, b) => a.label.localeCompare(b.label));
          setProgramList(programs);
        }
      }).catch(() => {setProgramList([{ "filename": " ", "label": "Full: Default Program" }]);});
      return () => { mounted = false; };
    }, []);

    // If an initial program was selected (from localStorage), load it asynchronously
    useEffect(() => {
      let mounted = true;
      (async () => {
        const file = state.selectedFile;
        // if (!file) return; // no file selected - use default bundled one
        const fileContent = await loadProgram(file);
        if (!mounted) return;
        const dist = String(file).includes('half') ? HALF_DIST : MARATHON_DIST;
        const vobj = new Vdot(true, dist, state.gp + ":00");
        setState(prev => ({ ...prev, weeks: fileContent.weeks || [], themes: fileContent.themes || [], title: fileContent.title || '', paces: vobj.makeCalculations(), distance: dist }));
      })();
      return () => { mounted = false; };
    }, []);

    function onGPChange(e){
        const newGp = e.target.value;
        const vobj = new Vdot(true, state.distance, newGp + ":00");
        setState(prev => ({ ...prev, gp: newGp, paces: vobj.makeCalculations() }));
    }

    function onGPBlur(){
        localStorage.setItem('gp', state.gp);
    }

    async function onProgramChange(e){
        const file = e.target.value;
        const fileContent = await loadProgram(file);
        let dist = MARATHON_DIST;
        if (String(file).includes('half')) { dist=HALF_DIST; }
        const vobj = new Vdot(true, dist, state.gp + ":00");
        localStorage.setItem('selectedFile', file);
        setState(prev => ({
            ...prev,
            selectedFile: file,
            weeks: fileContent.weeks || [],
            themes: fileContent.themes || [],
            title: fileContent.title || '',
            paces: vobj.makeCalculations(),
            distance: dist
        }));
    }

    function onRaceChange(e){
        const race = e.target.value;
        localStorage.setItem('race', race);
        setState(prev => ({ ...prev, race }));
    }

    function raceSpliter(race,index){
        return race.split('-')[index];
    }

    return (
        <div className="App container well">
          <center style={{width:'50%',margin:'0 auto'}}>
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="id_race">Race : </label>
                <div className="col-sm-8">
                  <select value={state.race} id="id_race" onChange={onRaceChange}  className="form-control">
                    <option value="">Select Race</option>
                    {
                        state.races.map((r,i) => {
                            return  <option key={i} value={raceSpliter(r,1)}>{r}</option>
                        })
                    }

                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="id_gp">Goal Finish time : </label>
                <div className="col-sm-8">
                  <input id="id_gp" onChange={onGPChange} onBlur={onGPBlur} value={state.gp} className="form-control" placeholder="h:mm" pattern="\\d:\\d\\d" />
                </div>
              </div>
              <div className="form-group">

                <label className="col-md-4 control-label" htmlFor="s_trainingProgram"> Training Program Name: </label>
                <div className="col-sm-8">
                  <select value={state.selectedFile} id="s_trainingProgram" onChange={onProgramChange}  className="form-control">
                    <option value="">Select</option>
                    {programList.map((p, i) => (
                      <option key={i} value={p.filename}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </center>
          {
              state.race !== "" && state.selectedFile !== "" &&
                  <TrainingGrid raceDate={new Date(state.race)} weeks={state.weeks} themes={state.themes} today={new Date()}/>
          }


          <table className="table table-bordered">

            <thead>
              <tr>
              <th colSpan="5"><center>Paces</center></th>
              </tr>
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
                <td className="pace">{state.paces.easy}</td>
                <td>2</td>
                <td>These are days of semi-rest, nevertheless, as the weekend mileage builds, the weekday mileage also builds.<br/>
                </td>
                </tr>
              <tr>
                <td>LR</td>
                <td>Long Run</td>
                <td className="pace">{state.paces.xlong}</td>
                <td>2</td>
                <td>Pace for your long runs. Normally GP + 20-30s
                </td>
              </tr>
              <tr>
                <td>GP<br/>MP</td>
                <td>Goal Pace<br/>Marathon P</td>
                <td className="pace">{state.paces.gp}</td>
                <td>Mid-2</td>
                <td>Your Goal Pace for your marathon race.<br/>
                  HMP is typically 6-10s slower than your T pace.
                </td>
              </tr>
              <tr>
                <td>T</td>
                <td>Tempo / <br/>Threshold</td>
                <td className="pace">{state.paces.tempo}</td>
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
                <td className="pace">{state.paces.speed} - {state.paces.maximum}</td>
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
                <td className="pace">{state.paces.yasso}</td>
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

export default App;
