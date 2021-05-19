class Model {
  constructor() {
    this._windows = null;
    this._currentWindow = null;
    this._tabGroups = {};
    // this.listeners = {};

    chrome.runtime.onMessage.addListener((request) => {
      switch (request.name) {
        // case "initState":
        //   this._currentWindow = request.payload.currentWindow;
        //   this._windows = request.payload.windows;
        //   this._tabGroups = request.payload.tabGroups;
        //   break;
        case "storageUpdated":
          for (let [key, { oldValue, newValue }] of Object.entries(
            request.payload
          )) {
            if (!newValue) {
              delete this._tabGroups[key];
              continue;
            }

            this._tabGroups[key] = newValue;
          }
          console.log("model storageUpdated");
          console.dir(request.payload);
          break;
      }
    });
  }

  // bind(name, callback) {
  //   this.listeners[name] = callback;
  // }

  get windows() {
    return this._windows;
  }

  get currentWindow() {
    return this._currentWindow;
  }

  get tabGroups() {
    const groups = [];
    console.log("model tabGroups");
    console.log(this._tabGroups);

    for (const [key, value] of Object.entries(this._tabGroups)) {
      groups.push({ groupName: key, tabs: value });
    }

    return { payload: { groups } };
  }

  setInitialState(callback) {
    chrome.runtime.sendMessage(
      {
        name: "init",
        payload: null,
      },
      (res) => {
        console.log("model init");
        console.log(res);
        this._currentWindow = res.payload.currentWindow;
        this._windows = res.payload.windows;
        this._tabGroups = res.payload.tabGroups;

        callback(this.sortWindows(this._windows));
      }
    );
  }

  sortWindows(windows) {
    if (!windows) {
      return null;
    }

    windows = windows.filter((window) => window.id !== this._currentWindow.id);
    windows = [this._currentWindow].concat(windows).map((window) => ({
      id: window.id,
      isCurrent: this._currentWindow.id === window.id,
      tabs: window.tabs,
    }));

    return { payload: { windows } };
  }

  removeWindow(windowId) {
    chrome.runtime.sendMessage({
      name: "removeWindow",
      payload: { windowId },
    });
  }

  changeWindow(windowId) {
    chrome.runtime.sendMessage({
      name: "changeWindow",
      payload: { windowId },
    });
  }

  removeTab(tabId) {
    chrome.runtime.sendMessage({
      name: "removeTab",
      payload: { tabId },
    });
  }

  changeTab(tabId) {
    chrome.runtime.sendMessage({
      name: "changeTab",
      payload: { tabId },
    });
  }

  clearAllStorageSyncData() {
    chrome.runtime.sendMessage({
      name: "clearGroups",
      payload: null,
    });
  }

  saveTabsOfWindow(windowId) {
    const key = new Date().toISOString();
    const options = {};
    const tabs = this._windows
      .find((window) => window.id === windowId)
      .tabs.map((tab) => ({ title: tab.title, url: tab.url }));
    options[key] = tabs;
    chrome.runtime.sendMessage({
      name: "saveGroup",
      payload: options,
    });
  }

  removeGroup(groupName) {
    chrome.runtime.sendMessage({
      name: "removeGroup",
      payload: { groupName },
    });
  }

  openGroup(groupName) {
    console.log("model openGroup " + groupName);
    const url = this._tabGroups[groupName].map((tabGroup) => tabGroup.url);
    chrome.runtime.sendMessage({
      name: "openGroup",
      payload: { url },
    });
  }

  changeGroupTitle(prevName, newName) {
    chrome.runtime.sendMessage({
      name: "changeGroupName",
      payload: { prevName, newName },
    });
  }

  removeGroupTab(groupName, tabUrl) {
    chrome.runtime.sendMessage({
      name: "removeGroupTab",
      payload: { groupName, tabUrl },
    });
  }

  openTab(url) {
    chrome.runtime.sendMessage({
      name: "openTab",
      payload: { url },
    });
  }

  //이건 아예 유틸로 빼도될거같은데
  _swap(fromIndex, toIndex, array) {
    const temp = array[fromIndex];
    array[fromIndex] = array[toIndex];
    array[toIndex] = temp;
  }
}

export default Model;
