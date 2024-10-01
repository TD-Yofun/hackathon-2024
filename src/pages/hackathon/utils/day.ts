import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

const dayjsUtil = {
  dayjs,
};

export default dayjsUtil;

/**
 * use dayjs
 * give a date time number
 * return 'Today 12:00 PM' or 'Yesterday 12:00 PM' or '2021-01-01 12:00 PM'
 */
export function formatDateTime(date: number): string {
  const now = dayjs();
  const target = dayjs(date);
  if (now.isSame(target, 'day')) {
    return 'Today ' + target.format('LT');
  }
  if (target.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Yesterday ' + target.format('LT');
  }
  return target.format('lll');
}

export function toShortDate(date: number): string {
  return dayjs(date).format('ll');
}

export function isEqual(firstDate: Date, secondDate: Date, range?: 'y' | 'm' | 'd'): boolean {
  if (firstDate === secondDate) return true;
  switch (range) {
    case 'y':
      return firstDate.getFullYear() === secondDate.getFullYear();
    case 'm':
      return firstDate.getMonth() === secondDate.getMonth() && firstDate.getFullYear() === secondDate.getFullYear();
    case 'd':
      return (
        firstDate.getDate() === secondDate.getDate() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getFullYear() === secondDate.getFullYear()
      );
    default:
      return firstDate.getTime() === secondDate.getTime();
  }
}
