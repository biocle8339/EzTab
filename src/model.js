class Model {
  constructor() {
    this._windows = null;
    this._currentWindowId = null;
    this._tabGroups = {};

    chrome.runtime.onMessage.addListener((request) => {
      switch (request.name) {
        case "storageUpdated":
          for (let [key, { oldValue, newValue }] of Object.entries(
            request.payload.changes
          )) {
            if (!newValue) {
              delete this._tabGroups[key];
              continue;
            }

            this._tabGroups[key] = newValue;
          }
          console.log("model storageUpdated");
          console.dir(request.payload.changes);
          break;
        case "windowFocusChanged":
          console.log("model windowFocusChanged");
          if (request.payload.windowId > 0) {
            console.log("windowId " + request.payload.windowId);
            this._currentWindowId = request.payload.windowId;
          }

          break;
      }
    });
  }

  get currentWindowId() {
    return this._currentWindowId;
  }

  get windows() {
    return this._windows;
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
        this._currentWindowId = res.payload.currentWindowId;
        this._windows = res.payload.windows;
        this._tabGroups = res.payload.tabGroups;

        callback(this.sortWindows(this._windows));
      }
    );
  }

  sortWindows(windows) {
    console.log("model sortWindows");
    console.dir(windows);
    if (!windows) {
      return null;
    }

    let currentWindow;
    let sortedWindows = windows.filter((window) => {
      if (window.id === this._currentWindowId) {
        currentWindow = window;
      }

      return window.id !== this._currentWindowId;
    });
    sortedWindows = [currentWindow].concat(sortedWindows);
    sortedWindows.map((window) => ({
      id: window?.id,
      isCurrent: this._currentWindowId === window?.id,
      tabs: window?.tabs,
    }));
    console.log("sortedWindows");
    console.dir(sortedWindows);

    return {
      payload: { currentWindowId: currentWindow.id, windows: sortedWindows },
    };
  }

  search(value, callback) {
    const searchedWindows = this.windows.map((window) => {
      const tabs = window.tabs.filter(
        (tab) => tab.title.includes(value) || tab.url.includes(value)
      );

      return { ...window, tabs };
    });

    console.log("model search");
    console.dir(this.windows);
    console.dir(searchedWindows);
    callback(this.sortWindows(searchedWindows));
  }

  // getCurrentWindow() {
  //   chrome.runtime.sendMessage(
  //     {
  //       name: "getCurrentWindow",
  //       payload: null,
  //     },
  //     (res) => {
  //       callback(res.payload.text);
  //     }
  //   );
  // }

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

  saveTabsOfWindow(windowId, callback) {
    console.log("model saveTabsOfWindow");
    const key = new Date().toISOString();
    const options = {};
    const tabs = this._windows
      .find((window) => window.id === windowId)
      .tabs.map((tab) => ({ title: tab.title, url: tab.url }));
    options[key] = tabs;

    chrome.runtime.sendMessage(
      {
        name: "saveGroup",
        payload: options,
      },
      (res) => {
        callback(res.payload.text);
      }
    );
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

  changeGroupTitle(prevName, newName, callback) {
    chrome.runtime.sendMessage(
      {
        name: "changeGroupName",
        payload: { prevName, newName },
      },
      (res) => {
        callback(res.payload.text);
      }
    );
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
