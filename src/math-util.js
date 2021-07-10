import {curry, head, pipe, reduce, sum, toPairs, values} from 'ramda';

export const Sequence = (function sequenceIIFE() {
  var current = 0;
  return {
    getCurrentValue: function() {
      return current;
    },
    getNextValue: function() {
      current = current + 1;
      return current;
    }
  };
}());

export function pad(n, width, z) {
  const abs = (n < 0) ? -n : n;
  z = z || '0';
  let numS = abs + '';
  numS = numS.length >= width ? numS : new Array(width - numS.length + 1).join(z) + numS;
  return (n < 0) ? `-${numS}` : numS;
}

export const zeroPad2 = n => pad(n, 2);

export const round = curry((precision, float) => Number(float.toFixed(precision)));
export const roundToInt = round(0);
export const roundToTenth = round(1);

// sumProps :: object -> number
export const sumProps = pipe(values, sum);

// maxPairAccumulator :: [pair] -> pair
const maxPairAccumulator = (accum, pair) =>
  (pair[1] > accum[1]) ? pair : accum;

// getKeyOfMaxProp :: object -> string
export const getKeyOfMaxProp = pipe(
  toPairs,
  reduce(maxPairAccumulator, ['', -Infinity]),
  head
);
