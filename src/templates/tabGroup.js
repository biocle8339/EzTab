import generateTabEntryTemplate from "./tabEntry";

const generateTabGroupTemplate = (tabs, groupName) => {
  return `
  <div class="tab-group">
    <div class="buttons-container">
      <button class="delete group-button">X</button>
      <button class="collapsible group-button">Open Section ${groupName}</button>
    </div>
    <div class="expansion">
      <div class="tab-list">
        ${tabs.map((tab) => generateTabEntryTemplate(tab)).join("")}
      </div>
    </div>
  </div>
  `;
};

export default generateTabGroupTemplate;
