import { zeroPad2 } from './math-util';
import moment from 'moment';

export const formatDuration = (duration) => {
  const {months, days, hours, minutes, seconds} = duration;
  const allDays = months * 30 + days;
  const dayStr = (allDays > 0) ? `${allDays}d ` : '';
  const hrStr = (hours > 0 || allDays > 0) ? `${hours}h ` : '';
  const minStr = `${zeroPad2(minutes)}:`;
  const secStr = `${zeroPad2(seconds)}`;
  return `${dayStr}${hrStr}${minStr}${secStr}`;
}

export const isoDateToMsec = (isoDateStr) => new Date(isoDateStr).getTime();

//TODO rewrite dtToIsoLocal without using moment

// dtToIsoLocal :: (Date or ISO string) -> ISO string in local TZ
export const dtToIsoLocal = (dt) => moment(dt).format();
