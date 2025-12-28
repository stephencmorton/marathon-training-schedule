const MONDAY_IS_FIRST = true; // TODO - not impmemented


Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

Date.prototype.getIsoWeekday = function() {
  const day = this.getDay();
  // Adjust the day to ISO standard: Sunday (0) becomes 7
  return day === 0 ? 7 : day;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this);
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addWeeks = function(weeks) {
    var date = new Date(this);
    date.setDate(date.getDate() + (weeks * 7));
    return date;
}

// returns a new Date set to the Monday (start) of the ISO week for `d`
function isoWeekStart(d) {
  const dt = new Date(d);
  dt.setHours(0,0,0,0);
  // getDay: 0=Sun .. 6=Sat. Convert so Monday=0..Sunday=6
  const dayIndex = (dt.getDay() + 6) % 7;
  dt.setDate(dt.getDate() - dayIndex);
  return dt;
}

// difference in weeks: a - b (positive if a is later)
function weekDifference(a, b) {
  const aStart = isoWeekStart(a).getTime();
  const bStart = isoWeekStart(b).getTime();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.round((aStart - bStart) / msPerWeek);
}

export { isoWeekStart, weekDifference };
