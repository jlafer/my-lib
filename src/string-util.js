import * as R from 'ramda';

export const makePathList = R.split('.');

export const stripReturnAndSplitOnComma = R.pipe(R.init, R.split(','));

// trimLeadingZeroes :: string -> string
export const trimLeadingZeroes = (num) => {
  const digitCnt = num.length;
  const [leadingDigits, lastDigit] = (digitCnt === 1)
    ? ['0', num]
    : R.splitAt(digitCnt-1, num);
  return leadingDigits.replace(/^[0]*/g, '') + lastDigit;
}

module.exports = {
  joinStr,
  makePathList,
  stripReturnAndSplitOnComma,
  trimLeadingZeroes
};
