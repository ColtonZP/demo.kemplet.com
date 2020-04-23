exports.dateToday = (add) => {
  const date = new Date();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate() + add;
  const year = date.getFullYear();
  const returnDate = [month, day, year].join("/");
  return returnDate;
};
