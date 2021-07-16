import * as R from 'ramda';

export const makePathList = R.split('.');

export const stripReturnAndSplitOnComma = R.pipe(R.init, R.split(','));

// trimLeadingZeroes :: string -> string
export const trimLeadingZeroes = (num) => {
  const wOutLeadingZero = R.replace(/^0*/, '', num)
  return (wOutLeadingZero === '') ? '0' : wOutLeadingZero;
};
