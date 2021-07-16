import {add, all, curry, find, fromPairs, has, map, pick, pipe, propEq, propOr, props, reduce} from 'ramda';
import {valueIsArray} from './misc-util';

export const verifyAllItemsHaveKey = (objArr, arrName, key) => {
  if (! valueIsArray(objArr))
    throw new Error(`ERROR: ${arrName} does not contain an array of objects`)
  if (! all(has(key), objArr))
    throw new Error(`ERROR: ${arrName} has an item without a '${key}' property`)
  return true;
};

// sumValuesForKey :: string -> [obj] -> float
export const sumValuesForKey = curry((valueKey, arr) => {
  return pipe(
    map(propOr(0.0, valueKey)),
    reduce(add, 0.0))(arr);
});

export const pickFromAll = (keys, list) => map(pick(keys), list);

// kvProps :: (string, string) -> object -> object
const kvProps = (k, v) => props([k, v]);

// kvListToObj :: (string, string) -> [object] -> object
export const kvListToObj = (k, v) => pipe(
  map(kvProps(k, v)),
  fromPairs
);

const objToProps = curry((key, accum, obj) => {
  return {...accum, [obj[key]]: obj}
});

// keyedListToObj :: (string, [object]) -> object
export const keyedListToObj = (key, arr) => arr.reduce(objToProps(key), {});

// idValueListToObj :: [{id: a, value: b}] -> object
export const idValueListToObj = kvListToObj('id', 'value');
// nameValueListToObj :: [{name: a, value: b}] -> object
export const nameValueListToObj = kvListToObj('name', 'value');

// findObjByKeyVal :: string -> a -> [object] -> object
export const findObjByKeyVal = curry( (key, val, arr) => find(propEq(key, val), arr) );

export const findObjBySid = findObjByKeyVal('sid');
export const findObjByFriendlyName = findObjByKeyVal('friendlyName');
export const findObjByUniqueName = findObjByKeyVal('uniqueName');
