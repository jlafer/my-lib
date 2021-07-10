const R = require('ramda');

//TODO parameterize this function better
function createFlexFlow(client) {
  return client.flexApi.flexFlow
  .create({
     integrationType: 'studio',
     enabled: true,
     'integration.flowSid': 'FW63ed888f7f0592fc3bc087951abdd768',
     friendlyName: 'Docathon Studio FlexFlow',
     channelType: 'web',
     chatServiceSid: 'ISa821b3cd7cc14d36be97b79bc959c8b2'
   })
}

const deleteFlexFlow = R.curry((client, flexFlowSid) =>
  client.flexApi.flexFlow(flexFlowSid).remove());

const deleteFlexChannel = R.curry((client, flexChannelSid) =>
  client.flexApi.channel(flexChannelSid).remove());

const fetchFlexFlows = (client) => client.flexApi.flexFlow.list({limit: 20});

const fetchFlexChannels = (client) => client.flexApi.channel.list({limit: 20});

const formatFlexFlow = flexFlow => {
  const {
    sid,
    friendlyName,
    channelType,
    contactIdentity,
    integrationType,
    longLived
  } = flexFlow;
  return `sid: ${sid}, friendlyName="${friendlyName}", channelType=${channelType}, contactIdentity=${contactIdentity}, integrationType=${integrationType}, longLived=${longLived}`;
};

const formatFlexChannel = channel => {
  const {
    sid,
    userSid,
    flexFlowSid,
    taskSid,
    dateCreated,
    longLived
  } = channel;
  return `sid: ${sid}, userSid="${userSid}", flexFlowSid=${flexFlowSid}, taskSid=${taskSid}, dateCreated=${dateCreated}, longLived=${longLived}`;
};

const logFlexFlow = flexFlow => console.log(formatFlexFlow(flexFlow));

const logFlexChannel = flexChannel => console.log(formatFlexChannel(flexChannel));

function logFlexFlows(client) {
  fetchFlexFlows(client)
    .then(flexChannels => flexChannels.forEach(logFlexFlow));
}

function logFlexChannels(client) {
  fetchFlexChannels(client)
    .then(flexFlows => flexFlows.forEach(logFlexChannel));
}

function readFlexFlow(client, sid) {
  return client.flexApi.flexFlow(sid).fetch()
}

function readFlexChannel(client, sid) {
  return client.flexApi.channel(sid).fetch()
}

const updateFlexFlow = (client, flexFlowSid, data) => {
  const obj = (data) ? JSON.parse(data) : {};
  return client.flexApi.flexFlow(flexFlowSid).update(obj);
}

module.exports = {
  createFlexFlow,
  deleteFlexFlow,
  fetchFlexFlows,
  logFlexFlow,
  logFlexFlows,
  readFlexFlow,
  updateFlexFlow,
  deleteFlexChannel,
  fetchFlexChannels,
  logFlexChannel,
  logFlexChannels,
  readFlexChannel
};
