import {mkBase64Token} from './ajax-util';

// mkBase64Token tests
test("mkBase64Token with valid args returns token", () => {
  expect(mkBase64Token('foo', 'bar')).toEqual('Zm9vOmJhcg==');
});
