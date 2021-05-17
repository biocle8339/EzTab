class Model {
  constructor() {
    this._windows = null;
    this._currentWindow = null;
    this._tabGroups = {};
    // this.listeners = {};

    chrome.runtime.onMessage.addListener(async (request) => {
      switch (request.name) {
        case "storageUpdated":
          for (let [key, { oldValue, newValue }] of Object.entries(
            request.payload
          )) {
            this._tabGroups[key] = newValue;
          }
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

    for (const [key, value] of Object.entries(this._tabGroups)) {
      groups.push({ groupName: key, tabs: value });
    }
    console.log(groups);

    return { payload: { groups } };
  }

  async setInitialState() {
    this._currentWindow = await chrome.windows.getCurrent({ populate: true });
    this._windows = await chrome.windows.getAll({ populate: true });
    this._tabGroups = await this._getAllStorageSyncData();
  }

  sortWindows(windows) {
    windows = windows.filter((window) => window.id !== this._currentWindow.id);
    windows = [this._currentWindow].concat(windows).map((window) => ({
      id: window.id,
      isCurrent: this._currentWindow.id === window.id,
      tabs: window.tabs,
    }));

    return { payload: { windows } };
  }

  // async _getAllGroups() {
  //   const groups = [];
  //   this._tabGroups = await this._getAllStorageSyncData();

  //   for (const [key, value] of Object.entries(this._tabGroups)) {
  //     groups.push({ groupName: key, tabs: value });
  //   }

  //   return { payload: { groups } };
  // }

  clearAllStorageSyncData() {
    chrome.storage.sync.clear();
  }

  async removeWindow(windowId) {
    await chrome.windows.remove(windowId);
  }

  async changeWindow(windowId) {
    await chrome.windows.update(windowId, { focused: true });
  }

  saveTabsOfWindow(windowId) {
    const key = new Date().toISOString();
    const options = {};
    const tabs = this._windows.find((window) => window.id === Number(windowId))
      .tabs;
    options[key] = tabs;
    chrome.storage.sync.set(options);
  }

  async removeTab(tabId) {
    await chrome.tabs.remove(Number(tabId));
  }

  async changeTab(tabId) {
    await chrome.tabs.update(tabId, { active: true });
  }

  //이건 아예 유틸로 빼도될거같은데
  _swap(fromIndex, toIndex, array) {
    const temp = array[fromIndex];
    array[fromIndex] = array[toIndex];
    array[toIndex] = temp;
  }

  _getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (items) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }

        resolve(items);
      });
    });
  }
}

export default Model;
