import {wait} from './misc-util';

const identityP = (arg) => Promise.resolve(arg);

test('wait delays execution at start of promise chain', () => {
  return wait(500, 'foo')
    .then(data => {
      expect(data).toBe('foo');
    });
});
test('wait delays execution in middle of promise chain', () => {
  return identityP('foo')
    .then(wait(500))
    .then(data => {
      expect(data).toBe('foo');
    });
});
