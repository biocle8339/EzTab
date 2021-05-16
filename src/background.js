chrome.runtime.onInstalled.addListener(() => {
  console.log("now it is installed");
});

const getAllTabs = async () => {
  return await chrome.tabs.query({});
};
