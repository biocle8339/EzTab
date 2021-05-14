import taskQueue from "./utils/taskQueue.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.events = ["moveToCurrentTabs", "moveToTabGroups", "moveToTabUsage"];

    this.view.bind(this.events[0], (tabName) => {
      this._setTabState(tabName);
    });

    this.view.bind(this.events[1], (tabName) => {
      this._setTabState(tabName);
    });

    this.view.bind(this.events[2], () => {
      this.startAnimation();
    });

    this._setInitialState();
  }

  _setInitialState() {
    this.view.render("Current Tabs");
  }

  _setTabState(tabName) {
    //차후에 모델 만들면 연계해줘야된다.
    this.view.render(tabName);
  }
}

export default Controller;
