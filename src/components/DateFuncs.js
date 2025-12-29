const MONDAY_IS_FIRST = true; // TODO - not implemented

const msPerWeek = 7 * 24 * 60 * 60 * 1000;

function getWeek(date) {
  const dt = new Date(date.getTime());
  dt.setHours(0, 0, 0, 0);
  dt.setDate(dt.getDate() + 3 - (dt.getDay() + 6) % 7);
  const week1 = new Date(dt.getFullYear(), 0, 4);
  return 1 + Math.round(((dt.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getIsoWeekday(date) {
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

function addDays(date, days) {
  const dt = new Date(date.getTime());
  dt.setDate(dt.getDate() + days);
  return dt;
}

function addWeeks(date, weeks) {
  return addDays(date, weeks * 7);
}

// returns a new Date set to the Monday (start) of the ISO week for `d`
function startOfWeek(d) {
  // create a local-midnight date for the same Y/M/D
  const dt = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dayIndex = (dt.getDay() + 6) % 7; // Monday=0
  dt.setDate(dt.getDate() - dayIndex);
  return dt;
}

// difference in weeks: a - b (positive if a is later)
function differenceInCalendarWeeks(a, b) {
  const aStart = startOfWeek(a).getTime();
  const bStart = startOfWeek(b).getTime();
  return Math.trunc((aStart - bStart) / msPerWeek);
}


export { startOfWeek, differenceInCalendarWeeks, getWeek, getIsoWeekday, addDays, addWeeks };
