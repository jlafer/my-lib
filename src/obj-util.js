import * as R from 'ramda';

// mapKeysOfObject :: mapFirstOfPairFn -> object -> object
export const mapKeysOfObject = mapFirstOfPairFn => R.pipe(
  R.toPairs, R.map(mapFirstOfPairFn), R.fromPairs
);

// mapValuesOfObject :: objMapperFn -> object -> object
export const mapValuesOfObject = objMapperFn => R.pipe(
  R.toPairs,
  R.map(R.converge(R.pair, [R.head, R.pipe(R.last, objMapperFn)])),
  R.fromPairs
);

// objPropsCnt: returns the count of property keys in an object
// object -> integer
export const objPropsCnt = R.pipe(R.keys, R.length);

// NOTE: the following is not documented bcos I'm not sold on its value

// objToKeyedList :: (string, object) -> [object]
export const objToKeyedList = (key, obj) => Object.entries(obj).map(
  (([k, prop]) => ({...prop, [key]: k}))
);

