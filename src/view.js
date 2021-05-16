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

  bind(event, handler) {
    switch (event) {
      // case "moveToCurrentTabs":
      //   this.$currentTabsLink.addEventListener("click", ({ target }) => {
      //     this.$marker.style.width = `${target.offsetwidth}px`;
      //     this.$marker.style.transform = `translateX(${
      //       target.closest(".nav-link").dataset.distance
      //     }px)`;
      //     this.$carousel.style.left = "0px";

      //     const tabName =
      //       target.tagName !== "SPAN"
      //         ? target.querySelector("span")?.textContent
      //         : target.textContent;

      //     handler(tabName);
      //   });
      //   break;
      // case "moveToTabGroups":
      //   this.$tabGroupsLink.addEventListener("click", ({ target }) => {
      //     this.$marker.style.width = `${target.offsetwidth}px`;
      //     this.$marker.style.transform = `translateX(${
      //       target.closest(".nav-link").dataset.distance
      //     }px)`;
      //     this.$carousel.style.left = "-500px";

      //     const tabName =
      //       target.tagName !== "SPAN"
      //         ? target.querySelector("span")?.textContent
      //         : target.textContent;

      //     handler(tabName);
      //   });
      //   break;
      // case "moveToTabUsage":
      //   this.$tabUsageLink.addEventListener("click", ({ target }) => {
      //     this.$marker.style.width = `${target.offsetwidth}px`;
      //     this.$marker.style.transform = `translateX(${
      //       target.closest(".nav-link").dataset.distance
      //     }px)`;
      //     this.$carousel.style.left = "-1000px";

      //     const tabName =
      //       target.tagName !== "SPAN"
      //         ? target.querySelector("span").textContent
      //         : target.textContent;

      //     handler(tabName);
      //   });
      //   break;
      default:
        throw new Error("wrong event name");
    }
  }

  render(name, data) {
    switch (name) {
      case "Current Tabs": {
        const template = data.payload.windows.reduce((acc, curr) => {
          return acc + generateTabListTemplate(curr);
        }, "");

        this.$currentTabs.innerHTML = template;
        this.$tabListSaveButtons = document.querySelectorAll(".save-button");
        this.$tabCopyButtons = document.querySelectorAll(".tab-copy-button");
        this.$tabDeleteButtons = document.querySelectorAll(
          ".tab-delete-button"
        );
        this.$tabTitleButtons = document.querySelectorAll(".tab-title-button");
        break;
      }
      case "Tab Groups": {
        // const template = data.payload.groups.reduce((acc, curr) => {
        //   return acc + generateTabGroupTemplate(curr.tabs, curr.groupName);
        // }, "");

        // this.$tabGroups.innerHTML = template;
        // const $collapsibles = document.querySelectorAll(".collapsible");
        // const $deletes = document.querySelectorAll(".delete");

        // $collapsibles.forEach(($collapsible) => {
        //   $collapsible.addEventListener("click", ({ target }) => {
        //     target.classList.toggle("active");
        //     const $expansion = target.parentNode.nextElementSibling;

        //     if ($expansion.style.maxHeight) {
        //       $expansion.style.maxHeight = null;
        //     } else {
        //       $expansion.style.maxHeight = $expansion.scrollHeight + "px";
        //     }
        //   });
        // });

        // $deletes.forEach(($delete) => {
        //   $delete.addEventListener("click", ({ target }) => {
        //     target.closest(".tab-group").remove();
        //   });
        // });

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
}

export default View;
