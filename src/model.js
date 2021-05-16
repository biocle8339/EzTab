class Model {
  constructor() {
    this.windows = null;
    this.currentWindow = null;
  }

  //나중에 background.js에서 탭이나 윈도우 상황바뀔때마다 업데이트되게 추가해줘야됨
  //현재는 더러워도 이대로 놔두자
  getCurrentWindow() {
    return this.currentWindow;
  }

  async setCurrentWindow() {
    this.currentWindow = await chrome.windows.getCurrent({ populate: true });
  }

  async getAllWindows() {
    let windows = await chrome.windows.getAll({ populate: true });
    windows = windows.filter((window) => window.id !== this.currentWindow.id);
    windows = [this.currentWindow].concat(windows).map((window) => ({
      id: window.id,
      isCurrent: this.currentWindow.id === window.id,
      tabs: window.tabs,
    }));
    return { payload: { windows } };
  }

  async getAllGroups() {
    const groups = [];

    return { payload: { groups } };
  }

  getAllStorageSyncData() {
    chrome.storage.sync.get(null, (data) => {
      console.log(data);
      this.tabGroups = data;
    });
    console.log(this.tabGroups);
  }

  clearAllStorageSyncData() {
    chrome.storage.sync.clear();
  }

  async removeWindow(windowId) {
    await chrome.windows.remove(windowId);
  }

  async changeWindow(windowId) {
    await chrome.windows.update(windowId, { focused: true });
  }

  saveTabsOfWindow(tabUrls) {
    const key = new Date().toISOString();
    const options = {};
    options[key] = tabUrls;
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
}

export default Model;
