class View {
  constructor() {
    this.$carousel = document.querySelector(".carousel");
    this.$currentTabsLink = document.querySelector(
      `.nav-link[data-tab="current-tabs"]`
    );
    this.$tabGroupsLink = document.querySelector(
      `.nav-link[data-tab="tab-groups"]`
    );
    this.$tabUsageLink = document.querySelector(
      `.nav-link[data-tab="tab-usage"]`
    );
    this.$marker = document.querySelector(".marker");
    this.$currentTabs = document.querySelector(".current-tabs");
    this.$tabGroups = document.querySelector(".tab-groups");
    this.$tabUsage = document.querySelector(".tab-usage");
  }

  bind(event, handler) {
    switch (event) {
      case "moveToCurrentTabs":
        this.$currentTabsLink.addEventListener("click", ({ target }) => {
          this.$marker.style.width = `${target.offsetwidth}px`;
          this.$marker.style.transform = `translateX(${
            target.closest(".nav-link").dataset.distance
          }px)`;
          this.$carousel.style.left = "0px";

          const tabName =
            target.tagName !== "SPAN"
              ? target.querySelector("span")?.textContent
              : target.textContent;

          handler(tabName);
        });
        break;
      case "moveToTabGroups":
        this.$tabGroupsLink.addEventListener("click", ({ target }) => {
          this.$marker.style.width = `${target.offsetwidth}px`;
          this.$marker.style.transform = `translateX(${
            target.closest(".nav-link").dataset.distance
          }px)`;
          this.$carousel.style.left = "-500px";

          const tabName =
            target.tagName !== "SPAN"
              ? target.querySelector("span")?.textContent
              : target.textContent;

          handler(tabName);
        });
        break;
      case "moveToTabUsage":
        this.$tabUsageLink.addEventListener("click", ({ target }) => {
          this.$marker.style.width = `${target.offsetwidth}px`;
          this.$marker.style.transform = `translateX(${
            target.closest(".nav-link").dataset.distance
          }px)`;
          this.$carousel.style.left = "-1000px";

          const tabName =
            target.tagName !== "SPAN"
              ? target.querySelector("span").textContent
              : target.textContent;

          handler(tabName);
        });
        break;
      default:
        throw new Error("wrong event name");
    }
  }

  render(name, datum) {
    switch (name) {
      case "Current Tabs": {
        const generateTabEntryTemplate = (data) => {
          return `
          <div class="tab-entry ${!data ? "current" : ""}">
            <div class="favicon-container"></div>
            <div class="tab-title-container"></div>
            <div class="entry-buttons-container">
              <div class="copy-button-container">
                <img class="icon copy-icon" src="./images/copy-icon.png" />
              </div>
              <div class="delete-button-container">
                <img class="icon delete-icon" src="./images/delete-icon.png" />
              </div>
            </div>
          </div>
          `;
        };
        //model이랑 연계되면 name-container 바꿔야됨
        datum = [1, 2, 3];
        const template = `
        <div class="window">
          <div class="tabs-header">
            <div class="tabs-name-container">
            Current Window
            </div>
            <div class="tabs-save-button-container">
              <button class="button save-button">☁️ Save</button>
            </div>
          </div>
          <div class="tab-list">
            ${datum.map((data) => generateTabEntryTemplate(data)).join("")}
          </div>
        </div>
        `;
        //tab-list에 multiple tab-entry 포함시키기

        this.$currentTabs.innerHTML = template;
        break;
      }
      case "Tab Groups": {
        const generateTabGroupTemplate = (data) => {
          return `
          <div class="tab-group">
            <div class="buttons-container">
              <button class="delete group-button">X</button>
              <button class="collapsible group-button">Open Section ${data}</button>
            </div>
            <div class="expansion">
              <div class="tab-list">
                ${datum.map((data) => generateTabEntryTemplate(data)).join("")}
              </div>
            </div>
          </div>
          `;
        };
        const generateTabEntryTemplate = (data) => {
          return `
          <div class="tab-entry ${!data ? "current" : ""}">
            <div class="favicon-container"></div>
            <div class="tab-title-container"></div>
            <div class="entry-buttons-container">
              <div class="copy-button-container">
                <img class="icon copy-icon" src="./images/copy-icon.png" />
              </div>
              <div class="delete-button-container">
                <img class="icon delete-icon" src="./images/delete-icon.png" />
              </div>
            </div>
          </div>
          `;
        };
        datum = [1, 2, 3];
        const template = `
        <div class="tab-groups">
          ${datum.map((data) => generateTabGroupTemplate(data)).join("")}
        </div>
        `;

        this.$tabGroups.innerHTML = template;
        const $collapsibles = document.querySelectorAll(".collapsible");
        const $deletes = document.querySelectorAll(".delete");

        $collapsibles.forEach(($collapsible) => {
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

        $deletes.forEach(($delete) => {
          $delete.addEventListener("click", ({ target }) => {
            target.closest(".tab-group").remove();
          });
        });

        break;
      }
      default:
        throw new Error("wrong render name");
    }
  }
}

export default View;
