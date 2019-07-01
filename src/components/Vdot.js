export class Vdot
{
    /**
     * @see J. Daniels, The Conditioning for Distance Running--the Scientific Aspects, John Wiley & Sons, New York, 1978
     * @see T. Noakes, Lore of Running (4th edition), Oxford University Press Southern Africa, 2001
     * @see http://www.simpsonassociatesinc.com/runningmath3.htm
     * @see http://www.had2know.com/health/vo2-max-calculator-racing-daniels-gilbert.html
     */

    constructor(metric, rlength, timestring){
        this.metric = metric;
        this.VO2Max = -1;
        

        //TODO: convert timestring
        var timearr=timestring.split(':',3);
        if (timearr.length === 2) { timearr.unshift(0);}
        var time = timearr[0] * 60 + timearr[1] * 1 + timearr[2] / 60;
        
        if(time <= 0 || isNaN(time)) {
            //      alert('Please input a valid time');
            return;
        }
        
        if(rlength <= 0 || isNaN(rlength)) {
            //      alert('Please input a valid race length.');
            return;
        }
        
        if(!this.metric){
            rlength *= 1.609;
        }
        
        this.speed = rlength / time;  // Goal Pace. Not to be confused with speedwork.
        
        this.VO2Max = this.velToVO2(this.speed) / this.timeToPercentVO2Max(time) ;
        //makeCalculations();
    }

    makeCalculations() {
        
        if(this.VO2Max <= 0){
            return {easy: 0, tempo: 0, maximium: 0, speed: 0, long: 0, yasso: 0};
        }

        var velEasy     = this.VO2ToVel(this.VO2Max * .7);
        var velTempo    = this.VO2ToVel(this.VO2Max * .88);
        var velMaximum  = this.VO2ToVel(this.VO2Max);
        var velSpeed    = this.VO2ToVel(this.VO2Max * 1.1);
        var vellong_l   = this.VO2ToVel(this.VO2Max * 0.75);
//        var velxlong    = this.VO2ToVel(this.VO2Max * .6);
        var velYasso    = velMaximum * 1.95;
        
        var toAppend;
        if (this.metric) {
            toAppend=' min/km';
        } else {
            toAppend=' min/mile';
        }

        var frm = {};

        frm.easy    = '' + this.timeConvert(velEasy)     + toAppend;
        frm.tempo    = '' + this.timeConvert(velTempo)   + toAppend;
        frm.maximum  = '' + this.timeConvert(velMaximum) + toAppend;
        frm.speed    = '' + this.timeConvert(velSpeed)   + toAppend;
        frm.xlong    = '' + this.timeConvert(velEasy)
            + ' - ' + this.timeConvert(vellong_l)   + toAppend;
        frm.gp        = this.timeConvert(this.speed) + toAppend;
        var oldMetric = this.metric;
        this.metric = false;
        frm.yasso    = '' + this.timeConvert(velYasso)  + ' min/800';
        this.metric = oldMetric;
        return frm;
    }

    // // Toggle output type of paces.
    // toggleMetric() {
    //   if(document.forms.input1.paceType.options[0].selected) {
    //     this.metric = false;
    //   } else {
    //     this.metric = true;
    //   }
    //   this.makeCalculations();
    // }
    
    // Takes a velocity and converts it to a VO2 level.   
    velToVO2 (vel) {
        return (-4.60 + 0.182258 * vel + 0.000104 * vel * vel);
    }
    
    // Takes a VO2 measurement and converts it to a velocity.
    VO2ToVel (VO2) {
        return (29.54 + 5.000663 * VO2 - 0.007546 * VO2 * VO2);
    }

    // Takes a time in minutes and uses EQ 2 to convert it to a percent of VO2 maximum.   
    timeToPercentVO2Max (minutes) {
        return (.8 + 0.1894393 * Math.exp(-.012778 * minutes) + 0.2989558 * Math.exp(-.1932695 * minutes));
    }

    // Takes a speed in metres / minute a converts it to a string representing a pace in
    // minutes per mile or km.   
    timeConvert (speed) {
        var ans;
        if(!this.metric){
            ans = (1 / speed) * 1609;
        } else {
            ans = (1 / speed) * 1000;
        }
        var minutes = Math.floor(ans);
        var seconds = Math.floor((ans - minutes) * 60);
        if(seconds > 9){
            return '' + minutes + ':' + seconds;
        } else {
            return '' + minutes + ':0' + seconds;
        }
    }
}


