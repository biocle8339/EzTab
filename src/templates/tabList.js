import generateTabEntryTemplate from "./tabEntry";

const generateTabListTemplate = ({ id, tabs, isCurrent }) => {
  return `
  <div class="window" data-window-id=${id}>
    <div class="tabs-header">
      <div class="tabs-name-container">
      ${isCurrent ? "Current" : "Other"} Window (${tabs.length})
      </div>
      <div class="tabs-buttons-container">
      <button class="tabs-button tabs-save-button">☁️ Save</button>
        <button class="tabs-button tabs-delete-button">X Delete</button>
      </div>
    </div>
    <div class="tab-list">
      ${tabs.map((tab) => generateTabEntryTemplate(tab)).join("")}
    </div>
  </div>
  `;
};

export default generateTabListTemplate;
