/*
  This function returns a Sync token for a Flex client.
  
  Parmeters
    url - the URL of an endpoint that builds and returns a Sync token (see below)
    manager - the Flex manager object
    identity - the identity string that uniquely identifies the Flex Worker;
      typically, the Worker SID is used; it can be obtained here:
      manager.store.getState().flex.worker.source.sid
  Returns
    response - an object with the following content: {token: <string>}

  The endpoint at 'url' should expect a payload that has the following content:
    {Identity: <string>, Token: <string>}.
  The above payload contains the worker's identity and and an active Flex token.
  The endpoint should return a Sync token object.
  
  An example function can be found at https://github.com:jlafer/flex-plugin-template/plugin-template-fns/get-sync-token.js.
*/
// TODO callApiFormEncoded should be in this pkg
/*
import {callApiFormEncoded} from 'jlafer-flex-util';

export const getSyncToken = (url, manager, identity) => {
  const flexState = manager.store.getState().flex;
  const token = flexState.session.ssoTokenPayload.token;
  
  const data = {Identity: identity, Token: token};
  return callApiFormEncoded(url, 'post', data);
}; */
