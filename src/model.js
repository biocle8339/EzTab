import _ from "lodash";

class Model {
  constructor() {
    this.windows = null;
    this.currentWindowId = null;
  }

  async getAllWindows() {
    const windows = _.groupBy(await chrome.tabs.query({}), "windowId");
    const currentWindow = await chrome.windows.getCurrent({});
    this.currentWindowId = currentWindow.id.toString();
    this.windows = windows;
    return { windows, currentWindowId: this.currentWindowId };
  }
}

export default Model;
