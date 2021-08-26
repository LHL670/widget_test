var today = new Date();

export function afterSeconds(seconds){
    var afterSeconds = new Date();
    afterSeconds.setSeconds(today.getSeconds()+seconds);
    return afterSeconds;
}
export function afterMinutes(minutes){
    var afterMinutes = new Date();
    afterMinutes.setMinutes(today.getMinutes()+minutes);
    return afterMinutes;
}
export function afterHours(hours){
    var afterHours = new Date();
    afterHours.setHours(today.getHours()+hours);
    return afterHours;
}
export function afterMinuteSecond(minutes,seconds){
    var afterMinuteSecond = new Date();   
    afterMinuteSecond.setMinutes(today.getMinutes()+minutes);
    afterrMinuteSecond.setSeconds(afterMinuteSecond.getSeconds()+seconds);
    return afterMinuteSecond;
}
export function afterHourMinuteSecond(hours,minutes,seconds){
    var afterHourMinuteSecond = new Date();
    afterHourMinuteSecond.setHours(today.getHours()+hours);
    afterHourMinuteSecond.setMinutes(afterHourMinuteSecond.getMinutes()+minutes);
    afterHourMinuteSecond.setSeconds(afterHourMinuteSecond.getSeconds()+seconds);
    return afterHourMinuteSecond;
}
export function tomorrow(){
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    return tomorrow;
}
export function afterDay(day){
    var afterDay = new Date();
    afterDay.setDate(today.getDate()+day);
    return afterDay;
}
export function afterMonth(month){
    var afterMonth = new Date();
    afterMonth.setMonth(today.getMonth()+month);
    return afterMonth;
}
export function afterYear(year){
    var afterYear = new Date();
    afterYear.setFullYear(today.getFullYear()+year);
    return afterYear;
}
export function afterDayMonth(day,month){
    var afterDayMonth = new Date();
    afterDayMonth.setMonth(today.getMonth()+month);
    afterDayMonth.setDate(afterDayMonth.getDate()+day);
    return afterDayMonth;
}
export function afterDayMonthYear(day,month,year){
    var afterDayMonthYear = new Date();
    afterDayMonthYear.setFullYear(today.getFullYear()+year);
    afterDayMonthYear.setMonth(afterDayMonthYear.getMonth()+month);
    afterDayMonthYear.setDate(afterDayMonthYear.getDate()+day);
    return afterDayMonthYear;
}
