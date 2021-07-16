import * as M from './math-util';

// Sequence tests
test("Sequence.getCurrentValue initially returns 0", () => {
  expect(M.Sequence.getCurrentValue()).toEqual(0);
});
test("Sequence.getNextValue then returns 1", () => {
  expect(M.Sequence.getNextValue()).toEqual(1);
});
test("Sequence.getCurrentValue then returns 1", () => {
  expect(M.Sequence.getCurrentValue()).toEqual(1);
});
test("Sequence.getNextValue then returns 2", () => {
  expect(M.Sequence.getNextValue()).toEqual(2);
});

// pad tests
test("pad of 0 to N places returns zero-padded zero of length N", () => {
  expect(M.pad(0, 5)).toEqual('00000');
});
test("pad of single-digit to N places returns zero-padded number of length N", () => {
  expect(M.pad(3, 5)).toEqual('00003');
});
test("pad of N digits to N places returns number without padding", () => {
  expect(M.pad(12345, 5)).toEqual('12345');
});
test("pad of >N digits to N places returns number without padding", () => {
  expect(M.pad(123456, 5)).toEqual('123456');
});
test("pad of number with padding character returns z-padded string of length N", () => {
  expect(M.pad(3, 5, '-')).toEqual('----3');
});
test("pad of negative number to N places returns zero-padded number of length N", () => {
  expect(M.pad(-3, 5)).toEqual('-00003');
});

// zeroPad2 tests
test("zeroPad2 of 0 returns zero-padded zero of length 2", () => {
  expect(M.zeroPad2(0)).toEqual('00');
});
test("zeroPad2 of single-digit returns zero-padded number of length 2", () => {
  expect(M.zeroPad2(3)).toEqual('03');
});
test("zeroPad2 of 2 digits returns number without padding", () => {
  expect(M.zeroPad2(12)).toEqual('12');
});

// round tests
test("round to 0 precision returns integer value", () => {
  expect(M.round(0, 342.5378)).toEqual(343);
});
test("round to 2 precision returns float value", () => {
  expect(M.round(2, 342.5378)).toEqual(342.54);
});
test("round of ngative float returns rounded float value", () => {
  expect(M.round(2, -342.5378)).toEqual(-342.54);
});

// sumProps tests
test("sumProps of empty object returns zero", () => {
  expect(M.sumProps({})).toEqual(0);
});
test("sumProps of object with single prop returns value", () => {
  expect(M.sumProps({a: 5})).toEqual(5);
});
test("sumProps of object with multiple props returns value", () => {
  expect(M.sumProps({a: 5, b: 3})).toEqual(8);
});
test("sumProps of object with non-numeric prop returns NaN", () => {
  expect(M.sumProps({a: 5, b: 3, c: 'foobar'})).toEqual(NaN);
});

// getKeyOfMaxProp tests
test("getKeyOfMaxProp of empty object returns empty string", () => {
  expect(M.getKeyOfMaxProp({})).toEqual('');
});
test("getKeyOfMaxProp of object with single prop returns the key", () => {
  expect(M.getKeyOfMaxProp({a: 5})).toEqual('a');
});
test("getKeyOfMaxProp of object with multiple props returns key of max value", () => {
  expect(M.getKeyOfMaxProp({a: 5, b: 42, c: 7})).toEqual('b');
});
test("getKeyOfMaxProp of object with non-numeric prop returns key of max numeric value", () => {
  expect(M.getKeyOfMaxProp({a: 5, b: 3, c: 'foobar'})).toEqual('a');
});
test("getKeyOfMaxProp of object with no numeric props returns empty string", () => {
  expect(M.getKeyOfMaxProp({a: 'c', b: 'b', c: 'a'})).toEqual('');
});
