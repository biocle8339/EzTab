import generateTabGroupTemplate from "./templates/tabGroup";
import generateTabListTemplate from "./templates/tabList";
import getClosestTargetBySelector from "./utils/getClosestTargetBySelector";

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
        this.$currentTabListSaveButtons = this.$currentTabs.querySelectorAll(
          ".tabs-save-button"
        );
        this.$currentTabListCloseButtons = this.$currentTabs.querySelectorAll(
          ".tabs-close-button"
        );
        this.$currentTabCopyButtons = this.$currentTabs.querySelectorAll(
          ".tab-copy-button"
        );
        this.$currentTabCloseButtons = this.$currentTabs.querySelectorAll(
          ".tab-close-button"
        );
        this.$currentTabTitleButtons = this.$currentTabs.querySelectorAll(
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
        this.$groupTitleForms = this.$tabGroups.querySelectorAll(
          ".group-title-form"
        );
        this.$groupCollapsibleButtons = this.$tabGroups.querySelectorAll(
          ".collapsible"
        );
        this.$groupDeleteButtons = this.$tabGroups.querySelectorAll(
          ".delete-group"
        );
        this.$groupOpenButtons = this.$tabGroups.querySelectorAll(
          ".open-group"
        );
        this.$groupTabCopyButtons = this.$tabGroups.querySelectorAll(
          ".tab-copy-button"
        );
        this.$groupTabDeleteButtons = this.$tabGroups.querySelectorAll(
          ".tab-delete-button"
        );
        this.$groupTabTitleButtons = this.$tabGroups.querySelectorAll(
          ".tab-title-button"
        );

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

  getWindowId($elem) {
    return Number(
      getClosestTargetBySelector($elem, ".window").dataset.windowId
    );
  }

  removeTab($elem, callback) {
    const tabId = $elem.dataset.tabId;
    getClosestTargetBySelector($elem, ".tab-entry").remove();
    callback(tabId);
  }

  removeGroupTab($elem, callback) {
    const $tabList = getClosestTargetBySelector($elem, ".tab-list").children;
    const $tabGroup = getClosestTargetBySelector($elem, ".tab-group");
    const tabUrl = $elem.previousElementSibling.dataset.tabUrl;
    const groupName = $tabGroup.dataset.groupName;
    getClosestTargetBySelector($elem, ".tab-entry").remove();

    if ($tabList.length === 0) {
      $tabGroup.remove();
    }

    callback(groupName, tabUrl);
  }

  openTab($elem, callback) {
    const tabUrl = $elem.nextElementSibling.dataset.tabUrl;
    callback(tabUrl);
  }

  changeGroupTitle($elem, callback) {
    const $tabGroup = getClosestTargetBySelector($elem, ".tab-group");
    const prevName = $tabGroup.dataset.groupName;
    const newName = $elem.querySelector(".group-title").value;
    $tabGroup.dataset.groupName = newName;
    callback(prevName, newName);
  }

  expandGroup($elem) {
    $elem.classList.toggle("active");
    const $expansion = $elem.parentNode.nextElementSibling;

    if ($expansion.style.maxHeight) {
      $expansion.style.maxHeight = null;
    } else {
      $expansion.style.maxHeight = $expansion.scrollHeight + "px";
    }
  }

  removeGroup($elem, callback) {
    const $tabGroup = getClosestTargetBySelector($elem, ".tab-group");
    const groupName = $tabGroup.dataset.groupName;
    console.log(groupName);
    $tabGroup.remove();
    callback(groupName);
  }

  openGroup($elem, callback) {
    const $tabGroup = getClosestTargetBySelector($elem, ".tab-group");
    const groupName = $tabGroup.dataset.groupName;
    console.log(groupName);
    callback(groupName);
  }
}

export default View;
