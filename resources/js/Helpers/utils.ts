export const dateLocalTz = (date: Date | string): Date => {
  const parseDate = new Date(date);
  return new Date(parseDate.getTime() + parseDate.getTimezoneOffset() * 60000);
};
