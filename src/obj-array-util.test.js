import * as O from './obj-array-util';

// test data

const attributes = [
  {name: 'name', value: 'size'},
  {name: 'type', value: 'string'},
  {name: 'descr', value: 'product size'}
];
const scores = [
  {name: 'alice', value: 9},
  {name: 'bob', value: 7},
  {name: 'chuck', value: 8},
  {name: 'antonio', value: 7}
];

// findObjByKeyVal tests
test("findObjByKeyVal finds only matching object in list", () => {
  expect(O.findObjByKeyVal('name', 'bob', scores)).toEqual({name: 'bob', value: 7});
});
test("findObjByKeyVal finds first of two matching objects in list", () => {
  expect(O.findObjByKeyVal('value', 7, scores)).toEqual({name: 'bob', value: 7});
});
test("findObjByKeyVal returns undefined when no matching objects in list", () => {
  expect(O.findObjByKeyVal('value', 6, scores)).toEqual(undefined);
});

// kvListToObj tests
test("kvListToObj works for list of simple objects", () => {
  const nameValueListToObj = O.kvListToObj('name', 'value');
  expect(nameValueListToObj(attributes)).toEqual({name: 'size', type: 'string', descr: 'product size'});
});

// keyedListToObj tests
test("keyedListToObj works for list of simple objects", () => {
  expect(O.keyedListToObj('name', attributes)).toEqual({
    name: {name: 'name', value: 'size'},
    type: {name: 'type', value: 'string'},
    descr: {name: 'descr', value: 'product size'}});
});

// nameValueListToObj tests
test("nameValueListToObj works as mapper", () => {
  expect(O.nameValueListToObj(attributes)).toEqual({name: 'size', type: 'string', descr: 'product size'});
});

// verifyAllItemsHaveKey tests
test("verifyAllItemsHaveKey where all objects in array contain the key returns true", () => {
  expect(O.verifyAllItemsHaveKey(attributes, 'attributes', 'value')).toEqual(true);
});

// sumValuesForKey tests
test("sumValuesForKey where all objects in array contain the key returns sum", () => {
  expect(O.sumValuesForKey('value', scores)).toEqual(31);
});
