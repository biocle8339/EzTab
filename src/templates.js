import parseHTML from "./utils/parseHTML";

export const templates = {
  currentTabs: parseHTML(`
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
    </div>
  </div>
  `),
};
