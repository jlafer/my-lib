import {converge, curry, filter, find, head, includes, last, map, pair, pipe} from 'ramda';
import {isNotNil} from './misc-util';

// takes items from arr whose position is found in selector array of index values
//const takeSelected = (arr, selector) => selector.map(idx => arr[idx])
export const takeSelected = (arr, selector) => arr.filter(
  (_item, idx) => includes(idx, selector)
);

// makeMapFirstOfPairFn :: mapFn -> pair -> pair
export const makeMapFirstOfPairFn = mapFn =>
  converge(
    pair,
    [pipe(head, mapFn), last]
  );

export const filterOnMatchInOtherList = curry((predFn, otherList, listToMatch) => {
  const curriedPredFn = curry(predFn);
  return filter(
    matcher => isNotNil(find( curriedPredFn(matcher), otherList)),
    listToMatch
  );
});

export const filterOnMatchingKeyInOtherList = (key) => {
  const predFn = (m, o) => m[key] === o[key];
  return filterOnMatchInOtherList(predFn);
};

export const filterOnMatchingSidInOtherList = filterOnMatchingKeyInOtherList('sid');
export const filterOnMatchingUniqueNameInOtherList = filterOnMatchingKeyInOtherList('uniqueName');

export const matchAndMapLists = (matcherFn, mapperFn) => {
  return (listToMatch, others) => {
    const pairs = map(makeMatchedPair(matcherFn, others), listToMatch)
    const pairsWithMatch = filter(
      (pair) => !!last(pair),
      pairs
    )
    return map(mapperFn, pairsWithMatch);
  }
}

const makeMatchedPair = curry((matcherFn, others, itemToMatch) => {
  const curriedMatcherFn = curry(matcherFn);
  const matched = find(curriedMatcherFn(itemToMatch), others);
  if (!!matched) {
    return [itemToMatch, matched];
  }
  else {
    return [itemToMatch, undefined];
  }
});

export const mapAllToPromise = (fn, list) => Promise.all(map(fn, list));

  