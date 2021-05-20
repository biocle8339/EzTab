import "./popup.css";
import Controller from "./controller.js";
import Model from "./model.js";
import View from "./view.js";

const init = () => {
  console.log("popup init");
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  controller.init();
};

init();

const mockConsole = async () => {
  const currentWindow = await chrome.windows.getCurrent({});
  const currentWindowId = currentWindow.id;

  return (windowId) => {
    console.log(`mockConsole currentWindowId ${currentWindowId}`);
    console.log(`function WindowId ${windowId}`);
  };
};

mockConsole().then((fn) => (window.mockConsole = fn));
