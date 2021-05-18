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
        this.$currentTabListSaveButtons = this.$currentTabs.querySelectorAll(
          ".tabs-save-button"
        );
        this.$currentTabListDeleteButtons = this.$currentTabs.querySelectorAll(
          ".tabs-delete-button"
        );
        this.$currentTabCopyButtons = this.$currentTabs.querySelectorAll(
          ".tab-copy-button"
        );
        this.$currentTabDeleteButtons = this.$currentTabs.querySelectorAll(
          ".tab-delete-button"
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
        this.$groupTitleForms = document.querySelectorAll(".group-title-form");
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

  changeGroupTitle($elem, callback) {
    const prevName = $elem.dataset.groupName;
    const newName = $elem.querySelector(".group-title").value;
    $elem.dataset.groupName = newName;
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
}

export default View;
