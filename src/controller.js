import getClosestTargetBySelector from "./utils/getClosestTargetBySelector.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    await this.model.setInitialState();
    this.view.$navigation.addEventListener("click", async ({ target }) => {
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
          // this.model.clearAllStorageSyncData();
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

    this.view.render("Current Tabs", windows);

    this.addTabListEvent();
    this.addTabEntryEvent();
  }

  // setCurrentTabs(data) {
  //   this.view.render("Current Tabs", data);
  //   this.addTabListEvent();
  //   this.addTabEntryEvent();
  // }

  addTabGroupEvent() {
    this.view.$collapsibles?.forEach(($collapsible) => {
      $collapsible.addEventListener("click", ({ target }) => {
        target.classList.toggle("active");
        const $expansion = target.parentNode.nextElementSibling;

        if ($expansion.style.maxHeight) {
          $expansion.style.maxHeight = null;
        } else {
          $expansion.style.maxHeight = $expansion.scrollHeight + "px";
        }
      });
    });

    this.view.$deleteGroups?.forEach(($delete) => {
      $delete.addEventListener("click", ({ target }) => {
        target.closest(".tab-group").remove();
      });
    });
  }

  addTabListEvent() {
    this.view.$tabListSaveButtons.forEach(($tabListSaveButton) => {
      $tabListSaveButton.addEventListener("click", async ({ target }) => {
        const windowId = getClosestTargetBySelector(target, ".window").dataset
          .windowId;
        this.model.saveTabsOfWindow(windowId);
      });
    });
    this.view.$tabListDeleteButtons.forEach(($tabListDeleteButton) => {
      $tabListDeleteButton.addEventListener("click", ({ target }) => {
        const windowId = Number(
          getClosestTargetBySelector(target, ".window").dataset.windowId
        );
        this.model.removeWindow(windowId);
      });
    });
  }

  addTabEntryEvent() {
    this.view.$tabCopyButtons.forEach(($tabCopyButton) => {
      $tabCopyButton.addEventListener("click", async ({ currentTarget }) => {
        await navigator.clipboard.writeText(currentTarget.dataset.tabUrl);
      });
    });
    this.view.$tabDeleteButtons.forEach(($tabDeleteButton) => {
      $tabDeleteButton.addEventListener("click", ({ currentTarget }) => {
        const tabId = currentTarget.dataset.tabId;
        this.model.removeTab(tabId);
        this.view.removeTab(currentTarget);
      });
    });
    this.view.$tabTitleButtons.forEach(($tabTitleButton) => {
      $tabTitleButton.addEventListener("click", async ({ currentTarget }) => {
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
