chrome.runtime.onInstalled.addListener(() => {
  const tabs = getAllTabs();
});

const getAllTabs = async () => {
  return await chrome.tabs.query({});
};
