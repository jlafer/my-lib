const TokenValidator = require('twilio-flex-token-validator').functionValidator;
const {checkEnvVariable, corsResponse} = require('jlafer-twilio-runtime-util');

//TODO these two fns should go in library module
const getSyncDocByName = async (client, syncSvcSid, docName) => {
  try {
    const doc = await getSyncDoc(client, syncSvcSid, docName);
    return doc;  
  }
  catch (err) {
    return undefined;
  }
};

const getSyncDoc = (client, syncSvcSid, uniqueName) => {
  return client.sync.services(syncSvcSid).documents(uniqueName).fetch();
};

exports.handler = TokenValidator((context, event, callback) => {
  const response = corsResponse();
  try {
    const ACCOUNT_SID = checkEnvVariable(context, 'ACCOUNT_SID');
    const TWILIO_API_KEY_SID = checkEnvVariable(context, 'TWILIO_API_KEY_SID');
    const TWILIO_API_KEY_SECRET = checkEnvVariable(context, 'TWILIO_API_KEY_SECRET');
    const TWILIO_SYNC_SERVICE = checkEnvVariable(context, 'TWILIO_SYNC_SERVICE');

    const IDENTITY = event.Identity;

    const AccessToken = Twilio.jwt.AccessToken;
    const SyncGrant = AccessToken.SyncGrant;

    const syncGrant = new SyncGrant({
      serviceSid: TWILIO_SYNC_SERVICE
    });

    const accessToken = new AccessToken(
      ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET
    );
    accessToken.addGrant(syncGrant);
    accessToken.identity = IDENTITY;

    response.appendHeader("Content-Type", "application/json");
    response.setBody({token: accessToken.toJwt()});
    callback(null, response);
  }
  catch (err) {
    console.log(`GetSyncToken: caught ERROR: ${err}`);
    callback(err, response);
  }
});
