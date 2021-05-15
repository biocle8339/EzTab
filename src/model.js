class Model {
  constructor() {
    // this.windows = null;
    // this.currentWindowId = null;
  }

  async getAllWindows() {
    const currentWindow = await chrome.windows.getCurrent({ populate: true });
    const currentWindowId = currentWindow.id;
    let windows = await chrome.windows.getAll({ populate: true });
    windows = windows.filter((window) => window.id !== currentWindow.id);
    windows = [currentWindow].concat(windows).map((window) => ({
      isCurrent: currentWindowId === window.id,
      tabs: window.tabs,
    }));

    return { payload: { windows } };
  }

  //이건 아예 유틸로 빼도될거같은데
  _swap(fromIndex, toIndex, array) {
    const temp = array[fromIndex];
    array[fromIndex] = array[toIndex];
    array[toIndex] = temp;
  }
}

export default Model;
