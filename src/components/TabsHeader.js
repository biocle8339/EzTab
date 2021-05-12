import Component from "../core/Component.js";

class TabsHeader extends Component {
  template() {
    return `
    <div class="tabs-header">
      <div class="tabs-name-container">
      Current Window
      </div>
      <div class="tabs-save-button-container">
        <button class="button save-button">☁️ Save</button>
      </div>
    </div>
    `;
  }
}

export default TabsHeader;
