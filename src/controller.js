import taskQueue from "./utils/taskQueue.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.events = ["moveToCurrentTabs", "moveToTabGroups", "moveToTabUsage"];

    this.view.bind(this.events[0], (tabName) => {
      this._setTabState(tabName);
    });

    // this.view.bind(this.viewEvents[1], () => {
    //   this.startAnimation();
    // });

    // this.view.bind(this.viewEvents[2], () => {
    //   this.startAnimation();
    // });
  }

  _setTabState(tabName) {
    //차후에 모델 만들면 연계해줘야된다.
    this.view.render(tabName);
  }
}

export default Controller;
