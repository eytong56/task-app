import dates from "../constants/dates";

function formatDate(date) {
  return `${dates.DAYS_OF_WEEK[date.getDay()]}, ${
    dates.MONTHS[date.getMonth()]
  } 
      ${date.getDate()}`;
}

function formatDateYear(date) {
  return `${dates.DAYS_OF_WEEK[date.getDay()]}, ${
    dates.MONTHS[date.getMonth()]
  } 
      ${date.getDate()}, ${date.getFullYear()}`;
}

export { formatDate, formatDateYear };
