const addMonth = (date, month = 1) => {
  const newDate = new Date(date);
  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + month);

  const year = newDate.getFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysOfMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31,30,31];

  return newDate.setDate(Math.min(newDate, daysOfMonth[newDate.getMonth()]));
};

const addDays = (date, days = 30) => {
  const newDate = new Date(date);
  return newDate.setDate(newDate.getDate() + days);
};

const formatDate = (date, format = "YYYY/MM/DD") => {
  const dados = {
    YYYY: date.getFullYear(),
    MM: ("0" + (date.getMonth() + 1)).slice(-2),
    DD: ("0" + date.getDate()).slice(-2),
    HH: ("0" + date.getHours()).slice(-2),
    mm: ("0" + date.getMinutes()).slice(-2),
    ss: ("0" + date.getSeconds()).slice(-2),
    ms: ("00" + date.getMilliseconds()).slice(-3),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss|ms/g, function (element) {
    return dados[element];
  });
};

const reverse = (data) => {
  return data.split("/").reverse().join("/");
};

module.exports = {
  addMonth,
  addDays,
  formatDate,
  reverse,
};
