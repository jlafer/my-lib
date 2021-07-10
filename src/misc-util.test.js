import * as M from './misc-util';

// valueIsArray tests
test("valueIsArray returns true for empty array", () => {
  expect(M.valueIsArray([])).toEqual(true);
});
test("valueIsArray returns true for simple array", () => {
  expect(M.valueIsArray([1, 2, 3])).toEqual(true);
});
test("valueIsArray returns false for simple object", () => {
  expect(M.valueIsArray({foo: 'bar'})).toEqual(false);
});
test("valueIsArray returns false for scalar", () => {
  expect(M.valueIsArray('bar')).toEqual(false);
});

// valueIsObject tests
test("valueIsObject returns true for simple object", () => {
  expect(M.valueIsObject({foo: 'bar'})).toEqual(true);
});
test("valueIsObject returns false for number", () => {
  expect(M.valueIsObject(42)).toEqual(false);
});
test("valueIsObject returns false for array", () => {
  expect(M.valueIsObject([42, 43])).toEqual(false);
});

// valueNotObject tests
test("valueNotObject returns true for number", () => {
  expect(M.valueNotObject(42)).toEqual(true);
});
test("valueNotObject returns true for array", () => {
  expect(M.valueNotObject([42, 43])).toEqual(true);
});
test("valueNotObject returns false for simple object", () => {
  expect(M.valueNotObject({foo: 'bar'})).toEqual(false);
});
test("valueNotObject returns false for empty object", () => {
  expect(M.valueNotObject({})).toEqual(false);
});

// isNotEquals tests
test("isNotEquals returns true for unequal numbers", () => {
  expect(M.isNotEquals(42, 43)).toEqual(true);
});
test("isNotEquals returns true for number and null", () => {
  expect(M.isNotEquals(42, null)).toEqual(true);
});
test("isNotEquals returns false for equal numbers", () => {
  expect(M.isNotEquals(42, 2*21)).toEqual(false);
});
test("isNotEquals returns false for equal strings", () => {
  expect(M.isNotEquals('foobar', 'foo'+'bar')).toEqual(false);
});

// isNotNil tests
test("isNotNil returns true for number", () => {
  expect(M.isNotNil(42)).toEqual(true);
});
test("isNotNil returns true for array", () => {
  expect(M.isNotNil([42, 43])).toEqual(true);
});
test("isNotNil returns true for object", () => {
  expect(M.isNotNil({foo: 42})).toEqual(true);
});
test("isNotNil returns true for empty string", () => {
  expect(M.isNotNil('')).toEqual(true);
});
test("isNotNil returns true for empty array", () => {
  expect(M.isNotNil([])).toEqual(true);
});
test("isNotNil returns true for empty object", () => {
  expect(M.isNotNil({})).toEqual(true);
});
test("isNotNil returns false for null", () => {
  expect(M.isNotNil(null)).toEqual(false);
});
