export const dateDifference = (date2, date1, isShort = false) => {
  // const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  var msec = new Date(date2).getTime() - new Date(date1).getTime();
  var day = Math.floor(msec / 1000 / 60 / 60 / 24);
  if (day !== 0) {
    if (day === 1) {
      return day + `${isShort ? "d" : " day"} ago`;
    }
    return day + `${isShort ? "d" : " days"} ago`;
  }
  msec -= day * 1000 * 60 * 60 * 24;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  if (hh !== 0) {
    if (hh === 1) {
      return hh + `${isShort ? "h" : " hour"} ago`;
    }
    return hh + `${isShort ? "h" : " hours"} ago`;
  }
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  if (mm !== 0) {
    if (mm === 1) {
      return mm + `${isShort ? "m" : " minute"} ago`;
    }
    return mm + `${isShort ? "m" : " minutes"} ago`;
  }
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  if (ss !== 0) {
    if (ss === 1) {
      return ss + `${isShort ? "s" : " second"} ago`;
    }
    return ss + `${isShort ? "s" : " seconds"} ago`;
  }
  msec -= ss * 1000;

  // console.log(day + "days" + hh + ":" + mm + ":" + ss);
};
