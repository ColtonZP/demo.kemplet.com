export function dateToday(add: number) {
  const date = new Date();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate() + add;
  const year = date.getFullYear();
  const returnDate = [month, day, year].join('/');
  return returnDate;
}
