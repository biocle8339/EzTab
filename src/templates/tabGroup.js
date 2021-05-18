import generateGroupTabEntryTemplate from "./groupTabEntry";

const generateTabGroupTemplate = (tabs, groupName) => {
  return `
  <div class="tab-group">
    <div class="group-header">
      <form class="group-title-form" data-group-name=${groupName}>
        <input class="group-title" type="text" value="${groupName}">
      </form>
      <button class="collapsible group-button">+</button>
      <button class="delete-group group-button">X</button>
    </div>
    <div class="expansion">
      <div class="tab-list">
        ${tabs.map((tab) => generateGroupTabEntryTemplate(tab)).join("")}
      </div>
    </div>
  </div>
  `;
};

export default generateTabGroupTemplate;
