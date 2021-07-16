import {complement, curry, equals, isNil} from 'ramda';

export const wait = curry((ms, input) => {
  console.log('wait: ms:', ms);
  return new Promise(resolve => {setTimeout(() => resolve(input), ms)})
});

export const valueNotObject = value => !valueIsObject(value);
export const valueIsObject = value =>
  (typeof value === 'object' && ! Array.isArray(value));

// valueIsArray :: a -> boolean
export const valueIsArray = value => Array.isArray(value);

// isNotNil :: a -> boolean
export const isNotNil = complement(isNil);

// isNotEquals :: a -> b -> boolean
export const isNotEquals = complement(equals);
