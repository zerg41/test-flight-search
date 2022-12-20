export function formatDate(date: Date, format: 'HH:mm') {
  switch (format) {
    case 'HH:mm':
      return new Intl.DateTimeFormat('ru', { hour: 'numeric', minute: 'numeric' }).format(date);
  }
}

export function getDuration(dateStart: Date, dateEnd: Date) {
  return Math.abs(dateEnd.valueOf() - dateStart.valueOf());
}
