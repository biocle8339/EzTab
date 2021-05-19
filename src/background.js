chrome.runtime.onInstalled.addListener(() => {
  console.log("now it is installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("background " + request.name);
  switch (request.name) {
    case "init": {
      getInitialState().then((initalState) => sendResponse(initalState));
      break;
    }
    case "changeTab":
      chrome.tabs.update(request.payload.tabId, { active: true });
      break;
    case "changeWindow":
      chrome.windows.update(request.payload.windowId, { focused: true });
      break;
    case "removeTab":
      chrome.tabs.remove(Number(request.payload.tabId));
      break;
    case "removeWindow":
      chrome.windows.remove(request.payload.windowId);
      break;
    case "saveGroup":
      chrome.storage.sync.set(request.payload);
      // chrome.notifications.create("", {
      //   title: "Just wanted to notify you",
      //   message: "How great it is!",
      //   type: "basic",
      // });
      break;
    case "removeGroup":
      chrome.storage.sync.remove(request.payload.groupName);
      break;
    case "openGroup":
      console.log(request.payload);
      chrome.windows.create({ url: request.payload.url });
      break;
    case "clearGroups":
      chrome.storage.sync.clear();
      break;
    case "changeGroupName": {
      const { prevName, newName } = request.payload;
      changeGroupName(prevName, newName);
      break;
    }
    case "removeGroupTab": {
      const { groupName, tabUrl } = request.payload;
      removeGroupTab(groupName, tabUrl);
      break;
    }
    case "openTab":
      console.log(request.payload);
      chrome.windows.create({ url: request.payload.url });
      break;
  }

  console.log("hi");
  return true;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log("background storage onChanged");
  console.dir(changes);
  chrome.runtime.sendMessage({
    name: "storageUpdated",
    payload: changes,
  });
});

const getInitialState = async () => {
  const currentWindow = await chrome.windows.getCurrent({
    populate: true,
  });
  const windows = await chrome.windows.getAll({ populate: true });
  const tabGroups = await getStorageSyncData();

  return {
    name: "initRes",
    payload: {
      currentWindow,
      windows,
      tabGroups,
    },
  };
};

const removeGroupTab = async (groupName, tabUrl) => {
  const options = {};
  const data = await getStorageSyncData(groupName);
  console.log("background removeGroupTab");
  console.log(data);
  options[groupName] = data[groupName].filter((el) => el.url !== tabUrl);
  chrome.storage.sync.remove(groupName);

  if (options[groupName].length === 0) {
    return;
  }

  chrome.storage.sync.set(options);
};

const changeGroupName = async (prevName, newName) => {
  const options = {};
  const data = await getStorageSyncData(prevName);
  console.log("background changeGroupName");
  console.log(data);
  options[newName] = data[prevName];
  chrome.storage.sync.remove(prevName);
  chrome.storage.sync.set(options);
};

const getStorageSyncData = (key = null) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      resolve(items);
    });
  });
};
