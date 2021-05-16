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
    this.view.$navigation.addEventListener("click", async ({ target }) => {
      this.view.$marker.style.transform = `translateX(${
        target.closest(".nav-link").dataset.distance
      }px)`;

      const tabName =
        target.tagName !== "SPAN"
          ? target.querySelector("span").textContent
          : target.textContent;

      let data;

      switch (tabName) {
        case "Current Tabs":
          data = await this.model.getAllWindows();
          this.view.$carousel.style.left = "0px";
          break;
        case "Tab Groups":
          this.view.$carousel.style.left = "-500px";
          break;
        case "Tab Usage":
          this.view.$carousel.style.left = "-1000px";
          break;
        default:
          throw new Error("Invalid tab name");
      }

      //나중에 memoized해서 model바껴야만 바뀌도록해줘야함
      this.view.render(tabName, data);
    });

    const windows = await this.model.getAllWindows();
    this.view.render("Current Tabs", windows);
    this.view.$tabListSaveButtons.forEach(($tabListSaveButton) => {
      console.log($tabListSaveButton);
    });
    this.view.$entryCopyButtons.forEach(($entryCopyButton) => {
      $entryCopyButton.addEventListener("click", async ({ currentTarget }) => {
        await navigator.clipboard.writeText(currentTarget.dataset.tabUrl);
      });
    });
    this.view.$entryDeleteButtons.forEach(($entryDeleteButton) => {
      $entryDeleteButton.addEventListener("click", ({ currentTarget }) => {
        const tabId = currentTarget.dataset.tabId;
        this.model.removeTab(tabId);
        this.view.removeTab(tabId);
      });
    });
  }
}

export default Controller;
