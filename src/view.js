import generateTabGroupTemplate from "./templates/tabGroup";
import generateTabListTemplate from "./templates/tabList";

class View {
  constructor() {
    this.$carousel = document.querySelector(".carousel");
    this.$navigation = document.querySelector(".navigation");
    this.$marker = document.querySelector(".marker");
    this.$currentTabs = document.querySelector(".current-tabs");
    this.$tabGroups = document.querySelector(".tab-groups");
    this.$tabUsage = document.querySelector(".tab-usage");
  }

  // bind(event, handler) {
  //   switch (event) {
  //     default:
  //       throw new Error("wrong event name");
  //   }
  // }

  render(name, data) {
    switch (name) {
      case "Current Tabs": {
        const template = data.payload.windows.reduce((acc, curr) => {
          return acc + generateTabListTemplate(curr);
        }, "");

        this.$currentTabs.innerHTML = template;
        this.$tabListSaveButtons = this.$currentTabs.querySelectorAll(
          ".tabs-save-button"
        );
        this.$tabListDeleteButtons = this.$currentTabs.querySelectorAll(
          ".tabs-delete-button"
        );
        this.$tabCopyButtons = this.$currentTabs.querySelectorAll(
          ".tab-copy-button"
        );
        this.$tabDeleteButtons = this.$currentTabs.querySelectorAll(
          ".tab-delete-button"
        );
        this.$tabTitleButtons = this.$currentTabs.querySelectorAll(
          ".tab-title-button"
        );
        break;
      }
      case "Tab Groups": {
        if (data.payload.groups.length === 0) {
          this.$tabGroups.textContent = "NO GROUP EXIST";
          break;
        }

        const template = data.payload.groups.reduce((acc, curr) => {
          return acc + generateTabGroupTemplate(curr.tabs, curr.groupName);
        }, "");

        this.$tabGroups.innerHTML = template;
        this.$collapsibles = document.querySelectorAll(".collapsible");
        this.$deleteGroups = document.querySelectorAll(".delete-group");

        break;
      }
      case "Tab Usage": {
        console.log("hi tab usage");

        break;
      }
      default:
        throw new Error("wrong render name");
    }
  }

  removeTab($elem) {
    $elem.closest(".tab-entry").remove();
  }

  // addTabList(window) {
  //   this.$currentTabs.prepend();
  // }
}

export default View;
