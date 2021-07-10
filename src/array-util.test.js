import * as A from './array-util';
import * as R from 'ramda';

/*
  test data
*/
const emptyArray = [];
const testArray5Nums = [0,1,2,3,4];
const testArrayObjs = [
  {sid: 1, uniqueName: 'A1', category: 'A'},
  {sid: 2, uniqueName: 'A2', category: 'B'},
  {sid: 3, uniqueName: 'A3', category: 'B'},
  {sid: 4, uniqueName: 'A4', category: 'A'}
]

// takeSelected tests
test("takeSelected with all indexes returns entire array", () => {
  expect(A.takeSelected(testArray5Nums, testArray5Nums)).toEqual(testArray5Nums);
});
test("takeSelected with no indexes returns empty array", () => {
  expect(A.takeSelected(testArray5Nums, emptyArray)).toEqual(emptyArray);
});
test("takeSelected with a single index returns a one-item array", () => {
  expect(A.takeSelected(testArray5Nums, [2])).toEqual([2]);
});

// filterOnMatchInOtherList tests

// params: (predFn, others, listToMatch)

const matchOnScalarValue = (item, matcher) => item === matcher;

test("filterOnMatchInOtherList with all matching returns entire array", () => {
  expect(A.filterOnMatchInOtherList(matchOnScalarValue, testArray5Nums, testArray5Nums)).toEqual(testArray5Nums);
});
test("filterOnMatchInOtherList with no matches returns empty array", () => {
  expect(A.filterOnMatchInOtherList(matchOnScalarValue, [5,-1, 9], testArray5Nums)).toEqual(emptyArray);
});
test("filterOnMatchInOtherList with a single match returns a one-item array", () => {
  expect(A.filterOnMatchInOtherList(matchOnScalarValue, [3], testArray5Nums)).toEqual([3]);
});

// filterOnMatchingKeyInOtherList tests

const filterOnCategoryInOtherList = A.filterOnMatchingKeyInOtherList('category');

test("filterOnMatchingKeyInOtherList matches against a complete list using non-unique values", () => {
  expect(filterOnCategoryInOtherList(
    [{sid: 9, category: 'A'}, {sid: 10, category: 'B'}],
    testArrayObjs
  )).toEqual(testArrayObjs);
});
test("filterOnMatchingKeyInOtherList matches against a partial list using non-unique values", () => {
  expect(filterOnCategoryInOtherList(
    [{sid: 9, category: 'A'}],
    testArrayObjs
  )).toEqual([
    {sid: 1, uniqueName: 'A1', category: 'A'},
    {sid: 4, uniqueName: 'A4', category: 'A'}
  ]);
});
test("filterOnMatchingKeyInOtherList with no matches returns empty array", () => {
  expect(filterOnCategoryInOtherList(
    [{sid: 9, category: 'X'}, {sid: 10, category: 'Y'}],
    testArrayObjs
  )).toEqual(emptyArray);
});

// filterOnMatchingSidInOtherList tests

test("filterOnMatchingKeyInOtherList matches against a complete list using unique values", () => {
  expect(A.filterOnMatchingSidInOtherList(
    testArrayObjs,
    testArrayObjs
  )).toEqual(testArrayObjs);
});
test("filterOnMatchingKeyInOtherList matches against a partial list using unique values", () => {
  expect(A.filterOnMatchingSidInOtherList(
    [{sid: 1}, {sid: 3}],
    testArrayObjs
  )).toEqual([
    {sid: 1, uniqueName: 'A1', category: 'A'},
    {sid: 3, uniqueName: 'A3', category: 'B'}
  ]);
});

// matchAndMapLists tests

// params: (matcherFn, mapperFn)

const matchers1 = [
  {name: 'foo', value: 'foo-v', plus: 'a'},
  {name: 'bar', value: 'bar-v', plus: 'b'},
  {name: 'baz', value: 'baz-v', plus: 'c'}
];
const otherObjs = [
  {name: 'foo', value: 'foo-v', extra: 42 },
  {name: 'bar', value: 'bar-v', extra: 43 },
  {name: 'baz', value: 'baz-v', extra: 44 }
];
const partialOthers = [
  {name: 'foo', value: 'foo-v', extra: 42 },
  {name: 'bar', value: 'bar-v', extra: 43 }
];
const partialMatchers = [
  {name: 'foo', value: 'foo-v', plus: 'a'},
  {name: 'bar', value: 'bar-v', plus: 'b'}
];
const plusesAndExtras = [
  {plus: 'a', extra: 42},
  {plus: 'b', extra: 43},
  {plus: 'c', extra: 44}
];

describe('matchAndMapLists tests', () => {
  const matchNameMapToMatched = A.matchAndMapLists(
    (matcher, other) => (matcher.name === other.name),
    R.head
  );
  const matchNameMapToValue = A.matchAndMapLists(
    (matcher, other) => (matcher.name === other.name),
    R.pipe(R.head, R.prop('value'))
  );
  const matchNameMapToPlusAndExtra = A.matchAndMapLists(
    (matcher, other) => (matcher.name === other.name),
    pair => ({
      plus: pair[0].plus,
      extra: pair[1].extra
    })
  );
  test("matchAndMapLists matches objects on name, maps to matched", () => {
    expect(matchNameMapToMatched(matchers1, otherObjs)).toEqual(matchers1);
  });
  test("matchAndMapLists matches partial list of others, maps to matched", () => {
    expect(matchNameMapToMatched(matchers1, partialOthers))
    .toEqual(partialMatchers);
  });
  test("matchAndMapLists matches objects on name, maps to value", () => {
    expect(matchNameMapToValue(matchers1, otherObjs))
    .toEqual(['foo-v', 'bar-v', 'baz-v']);
  });
  test("matchAndMapLists matches objects on name, maps to {A.plus, B.extra}", () => {
    expect(matchNameMapToPlusAndExtra(matchers1, otherObjs))
    .toEqual(plusesAndExtras);
  });
});

// makeMapFirstOfPairFn tests
test("makeMapFirstOfPairFn transforms simple pair", () => {
  const strings = ['hdr', 'My Heading'];
  const mapFirstToUpper = A.makeMapFirstOfPairFn(R.toUpper);
  expect(mapFirstToUpper(strings)).toEqual(['HDR', 'My Heading']);
});
test("makeMapFirstOfPairFn transforms works as mapper", () => {
  const strings = [
    [1, 'First'],
    [2, 'Second']
  ];
  const mapFirstToZeroIdx = A.makeMapFirstOfPairFn(R.dec);
  expect(strings.map(mapFirstToZeroIdx)).toEqual([[0, 'First'],[1, 'Second']]);
});
