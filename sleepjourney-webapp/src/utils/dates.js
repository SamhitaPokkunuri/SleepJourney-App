export default function subtractMonths(date, months) {
  const m = date.getMonth();
  date.setMonth(m - months);
  return Math.round(date.getTime() / 1000);
}
