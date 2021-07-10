import {complement, equals, isNil} from 'ramda';

export function delayedPromise(mSec) {
  return new Promise(
    function(resolve, _reject) {
      setTimeout(
        function() {
          resolve(mSec);
        },
        mSec
      );
    }
  );
};

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const valueNotObject = value => !valueIsObject(value);
export const valueIsObject = value =>
  (typeof value === 'object' && ! Array.isArray(value));

// valueIsArray :: a -> boolean
export const valueIsArray = value => Array.isArray(value);

// isNotNil :: a -> boolean
export const isNotNil = complement(isNil);

// isNotEquals :: a -> b -> boolean
export const isNotEquals = complement(equals);
