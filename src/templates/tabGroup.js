import generateGroupTabEntryTemplate from "./groupTabEntry";

const generateTabGroupTemplate = (tabs, groupName) => {
  return `
  <div class="tab-group">
    <div class="buttons-container">
      <button class="delete-group group-button">X</button>
      <button class="collapsible group-button">Open Section ${groupName}</button>
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
