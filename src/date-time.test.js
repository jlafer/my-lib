import * as D from './date-time';

const dayDur = {months: 0, days: 1, hours: 5, minutes: 30, seconds: 30};
const monthDur = {months: 1, days: 1, hours: 5, minutes: 30, seconds: 30};
const hoursDur = {months: 0, days: 0, hours: 5, minutes: 30, seconds: 30};
const minsDur = {months: 0, days: 0, hours: 0, minutes: 30, seconds: 30};
const secsDur = {months: 0, days: 0, hours: 0, minutes: 0, seconds: 30};
const zeroSecsDur = {months: 0, days: 0, hours: 5, minutes: 0, seconds: 0};

// formatDuration tests
test("formatDuration above one day returns formatted string", () => {
  expect(D.formatDuration(dayDur)).toEqual('1d 5h 30:30');
});
test("formatDuration above one month returns formatted string", () => {
  expect(D.formatDuration(monthDur)).toEqual('31d 5h 30:30');
});
test("formatDuration below one day returns formatted string", () => {
  expect(D.formatDuration(hoursDur)).toEqual('5h 30:30');
});
test("formatDuration below one hour returns formatted string", () => {
  expect(D.formatDuration(minsDur)).toEqual('30:30');
});
test("formatDuration below one minute returns formatted string", () => {
  expect(D.formatDuration(secsDur)).toEqual('00:30');
});
test("formatDuration with zero mins and secs returns formatted string with padding", () => {
  expect(D.formatDuration(zeroSecsDur)).toEqual('5h 00:00');
});

// isoDateToMsec tests
test("isoDateToMsec returns 0 for the start of the epoch in GMT", () => {
  const utcDate1 = new Date(Date.UTC(1970, 0, 1, 0, 0, 0));
  expect(D.isoDateToMsec(utcDate1.toISOString())).toEqual(0);
});
test("isoDateToMsec returns correct value for a date in GMT", () => {
  const date = new Date('December 17, 1990 00:00:00Z');
  expect(D.isoDateToMsec(date)).toEqual(661392000000);
});
test("isoDateToMsec returns correct value for a date in PST", () => {
  const date = new Date('December 17, 1990 00:00:00-08:00');
  expect(D.isoDateToMsec(date)).toEqual(661420800000);
});

// test data
const dateEST = new Date('2018-12-17T08:00:00-05:00');
console.log(`dateEST = ${D.isoDateToMsec(dateEST)}`)
const dateMST = new Date('2018-12-17T06:00:00-07:00');
console.log(`dateMST = ${D.isoDateToMsec(dateMST)}`)

// dtToIsoLocal tests
test("dtToIsoLocal returns ISO string for the Denver time in EST", () => {
  expect(D.dtToIsoLocal(dateMST, 'America/New_York')).toEqual('2018-12-17T08:00:00-05:00');
});
test("dtToIsoLocal returns ISO string for the NY time in PST", () => {
  expect(D.dtToIsoLocal(dateEST, 'America/Los_Angeles')).toEqual('2018-12-17T05:00:00-08:00');
});
test("dtToIsoLocal returns ISO string for the NY time in EST", () => {
  expect(D.dtToIsoLocal(dateEST, 'America/New_York')).toEqual('2018-12-17T08:00:00-05:00');
});
test("dtToIsoLocal returns ISO string for the NY time in MST", () => {
  expect(D.dtToIsoLocal(dateEST, 'America/Denver')).toEqual('2018-12-17T06:00:00-07:00');
});
