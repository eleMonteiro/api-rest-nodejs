const addMonth = (date, month = 1) => {
  const newDate = new Date(date);
  newDate.setDate(1);
  newDate.setMonth(newDate.getMonth() + month);

  const daysInMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
  newDate.setDate(Math.min(newDate.getDate(), daysInMonth));

  return newDate;
};

const addDays = (date, days = 30) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

const formatDate = (date, format = "YYYY/MM/DD") => {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date");
  }

  const dados = {
    YYYY: date.getFullYear(),
    MM: ("0" + (date.getMonth() + 1)).slice(-2),
    DD: ("0" + date.getDate()).slice(-2),
    HH: ("0" + date.getHours()).slice(-2),
    mm: ("0" + date.getMinutes()).slice(-2),
    ss: ("0" + date.getSeconds()).slice(-2),
    ms: ("00" + date.getMilliseconds()).slice(-3),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss|ms/g, (element) => dados[element]);
};

const reverse = (data) => {
  if (typeof data !== "string") {
    throw new Error("Input should be a string");
  }
  return data.split("/").reverse().join("/");
};

module.exports = {
  addMonth,
  addDays,
  formatDate,
  reverse,
};
