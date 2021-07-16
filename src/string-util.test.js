import * as S from './string-util';

// joinStr tests
test("stripReturnAndSplitOnComma returns array from csv-format string", () => {
  expect(S.stripReturnAndSplitOnComma('a,b,c,d,e\n')).toEqual(['a','b','c','d','e']);
});

// stripReturnAndSplitOnComma tests
test("stripReturnAndSplitOnComma returns array from csv-format string", () => {
  expect(S.stripReturnAndSplitOnComma('a,b,c,d,e\n')).toEqual(['a','b','c','d','e']);
});

// trimLeadingZeroes tests
test("trimLeadingZeroes returns the input for single-digit number greater than zero", () => {
  expect(S.trimLeadingZeroes('5')).toEqual('5');
});
test("trimLeadingZeroes returns the input for number without leading zeroes", () => {
  expect(S.trimLeadingZeroes('12345')).toEqual('12345');
});
test("trimLeadingZeroes returns a zero for a single zero", () => {
  expect(S.trimLeadingZeroes('0')).toEqual('0');
});
test("trimLeadingZeroes trims a single leading zero", () => {
  expect(S.trimLeadingZeroes('0123')).toEqual('123');
});
test("trimLeadingZeroes trims multiple leading zeroes", () => {
  expect(S.trimLeadingZeroes('00000123')).toEqual('123');
});
test("trimLeadingZeroes trims a single leading zero from a two-digit number", () => {
  expect(S.trimLeadingZeroes('01')).toEqual('1');
});
