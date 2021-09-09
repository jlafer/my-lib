export const getSyncDocByName = async (client, syncSvcSid, docName) => {
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
