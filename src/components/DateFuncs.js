Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

Date.prototype.getIsoWeekday = function() {
    var date = new Date(this.getTime());
    let day = date.getDay();
    // Adjust the day to ISO standard: Sunday (0) becomes 7
    return day === 0 ? 7 : day;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addWeeks = function(weeks) {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + (weeks * 7));
    return date;
}
