import * as R from 'ramda';
import * as A from './array-util';
import * as O from './obj-util';

// mapKeysOfObject tests
test("mapKeysOfObject transforms simple object", () => {
  const strings = {
    header: 'My Header',
    body: 'My Body',
    footer: 'My Footer'
  };
  const mapFirstToUpper = A.makeMapFirstOfPairFn(R.toUpper);
  const mapKeysToUpper = O.mapKeysOfObject(mapFirstToUpper);
  expect(mapKeysToUpper(strings)).toEqual({
    HEADER: 'My Header',
    BODY: 'My Body',
    FOOTER: 'My Footer'
  });
});

// mapValuesOfObject tests
test("mapValuesOfObject transforms simple object", () => {
  const strings = {
    header: 'My Header',
    body: 'My Body',
    footer: 'My Footer'
  };
  const mapValuesToUpper = O.mapValuesOfObject(R.toUpper);
  expect(mapValuesToUpper(strings)).toEqual({
    header: 'MY HEADER',
    body: 'MY BODY',
    footer: 'MY FOOTER'
  });
});

// objPropsCnt tests
test("objPropsCnt with object returns property count", () => {
  const obj = {
    name: 'size',
    type: 'string',
    descr: 'product size'
  };
  expect(O.objPropsCnt(obj)).toEqual(3);
});
test("objPropsCnt with empty object returns zero", () => {
  const obj = {};
  expect(O.objPropsCnt(obj)).toEqual(0);
});

// objToKeyedList tests
test("objToKeyedList works for simple object", () => {
  const obj = {
    name: {value: 'size'},
    type: {value: 'string'},
    descr: {value: 'product size'}
  };
  expect(O.objToKeyedList('name', obj)).toEqual([
    {name: 'name', value: 'size'},
    {name: 'type', value: 'string'},
    {name: 'descr', value: 'product size'}
  ]);
});
test("objToKeyedList works for object already containing key", () => {
  const obj = {
    name: {name: 'name', value: 'size'},
    type: {name: 'type', value: 'string'},
    descr: {name: 'descr', value: 'product size'}
  };
  expect(O.objToKeyedList('name', obj)).toEqual([
    {name: 'name', value: 'size'},
    {name: 'type', value: 'string'},
    {name: 'descr', value: 'product size'}
  ]);
});
