export function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function getTomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function getNextWeekMondayISO() {
  const d = new Date();
  const day = d.getDay();
  // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const daysToMonday = ((8 - day) % 7) || 7;
  d.setDate(d.getDate() + daysToMonday);
  return d.toISOString().slice(0, 10);
}

export function isSameWeek(dateStr, mondayStr) {
  // dateStr, mondayStr in formato YYYY-MM-DD
  const d = new Date(dateStr);
  const m = new Date(mondayStr);
  const weekStart = new Date(m);
  const weekEnd = new Date(m);
  weekEnd.setDate(weekEnd.getDate() + 6);
  return d >= weekStart && d <= weekEnd;
}
