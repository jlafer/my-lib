// addTestDataToTaskConversations :: (task, data) -> attributes
export const addTestDataToTaskConversations = (task, data) => {
  const conversations = R.mergeRight(task.attributes.conversations, data);
  return R.assoc('conversations', conversations, task.attributes);
};

export const decodeContactUri = (uri) => uri.replace('_2B', '+').replace('_2D', '-').replace('_40', '@').replace('_2E', '.');

// sortWorkersByFullname can be used to sort the teams view like so
//    flex.WorkersDataTable.defaultProps.initialCompareFunction = sortWorkersByFullname;

export const sortWorkersByFullname = (worker1, worker2) =>
  (worker1.attributes.full_name < worker2.attributes.full_name) ? -1 : 1;
