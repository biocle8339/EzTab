import getClosestTargetBySelector from "./utils/getClosestTargetBySelector.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.model.setInitialState(this.renderInitialView.bind(this));
    this.view.$navigation.addEventListener("click", ({ target }) => {
      const $navLink = getClosestTargetBySelector(target, ".nav-link");
      this.view.$marker.style.transform = `translateX(${$navLink.dataset.distance}px)`;

      const tabName =
        target.tagName !== "SPAN"
          ? target.querySelector("span").textContent
          : target.textContent;

      let data;

      switch (tabName) {
        case "Current Tabs":
          data = this.model.sortWindows(this.model.windows);
          this.view.$carousel.style.left = "0px";
          break;
        case "Tab Groups":
          console.log("controller - tabGroup nav");
          console.log(this.model._tabGroups);
          data = this.model.tabGroups;
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

      switch (tabName) {
        case "Current Tabs":
          this.addTabListEvent();
          this.addTabEntryEvent();
          break;
        case "Tab Groups":
          this.addTabGroupEvent();
          this.addTabEntryEvent();
          break;
        case "Tab Usage":
          break;
        default:
          throw new Error("Invalid tab name");
      }
    });

    const windows = this.model.sortWindows(this.model.windows);

    if (!windows) {
      return;
    }

    this.view.render("Current Tabs", windows);

    this.addTabListEvent();
    this.addTabEntryEvent();
  }

  renderInitialView(data) {
    this.view.render("Current Tabs", data);
    this.addTabListEvent();
    this.addTabEntryEvent();
  }

  addTabGroupEvent() {
    this.view.$groupTitleForms?.forEach(($groupTitleForm) => {
      $groupTitleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.view.changeGroupTitle(event.target, this.model.changeGroupTitle);
      });
    });
    this.view.$collapsibles?.forEach(($collapsible) => {
      $collapsible.addEventListener("click", ({ target }) => {
        this.view.expandGroup(target);
      });
    });

    this.view.$deleteGroups?.forEach(($delete) => {
      // this.model.clearAllStorageSyncData();
      $delete.addEventListener("click", ({ target }) => {
        console.log("controller deleteGroup button event");
        console.log(target);
        target.closest(".tab-group").remove();
      });
    });
  }

  addTabListEvent() {
    this.view.$currentTabListSaveButtons.forEach(
      ($currentTabListSaveButton) => {
        $currentTabListSaveButton.addEventListener("click", ({ target }) => {
          const windowId = getClosestTargetBySelector(target, ".window").dataset
            .windowId;
          this.model.saveTabsOfWindow(windowId);
        });
      }
    );
    this.view.$currentTabListDeleteButtons.forEach(
      ($currentTabListDeleteButton) => {
        $currentTabListDeleteButton.addEventListener("click", ({ target }) => {
          const windowId = Number(
            getClosestTargetBySelector(target, ".window").dataset.windowId
          );
          this.model.removeWindow(windowId);
        });
      }
    );
  }

  addTabEntryEvent() {
    this.view.$currentTabCopyButtons.forEach(($currentTabCopyButton) => {
      $currentTabCopyButton.addEventListener(
        "click",
        async ({ currentTarget }) => {
          await navigator.clipboard.writeText(currentTarget.dataset.tabUrl);
        }
      );
    });
    this.view.$currentTabDeleteButtons.forEach(($currentTabDeleteButton) => {
      $currentTabDeleteButton.addEventListener("click", ({ currentTarget }) => {
        const tabId = currentTarget.dataset.tabId;
        this.model.removeTab(tabId);
        this.view.removeTab(currentTarget);
      });
    });
    this.view.$currentTabTitleButtons.forEach(($currentTabTitleButton) => {
      $currentTabTitleButton.addEventListener("click", ({ currentTarget }) => {
        const windowId = Number(
          getClosestTargetBySelector(currentTarget, ".window").dataset.windowId
        );
        const tabId = Number(currentTarget.dataset.tabId);

        if (this.model.currentWindow.id !== windowId) {
          this.model.changeWindow(windowId);
        }

        this.model.changeTab(tabId);
      });
    });
  }
}

export default Controller;
