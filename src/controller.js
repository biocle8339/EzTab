import taskQueue from "./utils/taskQueue.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.events = ["moveToCurrentTabs", "moveToTabGroups", "moveToTabUsage"];

    // this.view.bind(this.events[0], (tabName) => {
    //   this._setTabState(tabName);
    // });

    // this.view.bind(this.events[1], (tabName) => {
    //   this._setTabState(tabName);
    // });

    // this.view.bind(this.events[2], () => {
    //   this.startAnimation();
    // });
  }

  async init() {
    this.view.$currentTabsLink.addEventListener("click", ({ target }) => {
      this.view.$marker.style.width = `${target.offsetwidth}px`;
      this.view.$marker.style.transform = `translateX(${
        target.closest(".nav-link").dataset.distance
      }px)`;
      this.view.$carousel.style.left = "0px";

      const tabName =
        target.tagName !== "SPAN"
          ? target.querySelector("span").textContent
          : target.textContent;

      //나중에 memoized해서 model바껴야만 바뀌도록해줘야함
      this.view.render(tabName);
    });
    this.view.$tabGroupsLink.addEventListener("click", ({ target }) => {
      this.view.$marker.style.width = `${target.offsetwidth}px`;
      this.view.$marker.style.transform = `translateX(${
        target.closest(".nav-link").dataset.distance
      }px)`;
      this.view.$carousel.style.left = "-500px";

      const tabName =
        target.tagName !== "SPAN"
          ? target.querySelector("span").textContent
          : target.textContent;

      //나중에 memoized해서 model바껴야만 바뀌도록해줘야함
      this.view.render(tabName);
    });
    this.view.$tabUsageLink.addEventListener("click", ({ target }) => {
      this.view.$marker.style.width = `${target.offsetwidth}px`;
      this.view.$marker.style.transform = `translateX(${
        target.closest(".nav-link").dataset.distance
      }px)`;
      this.view.$carousel.style.left = "-1000px";

      const tabName =
        target.tagName !== "SPAN"
          ? target.querySelector("span").textContent
          : target.textContent;

      //나중에 memoized해서 model바껴야만 바뀌도록해줘야함
      this.view.render(tabName);
    });

    const datum = await this.model.getAllWindows();
    this.view.render("Current Tabs", datum);
  }

  _setTabState(tabName) {
    //차후에 모델 만들면 연계해줘야된다.
    this.view.render(tabName);
  }
}

export default Controller;
