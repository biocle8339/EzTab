import Component from "../core/Component.js";

class TabEntry extends Component {
  template() {
    const { el } = this.props;

    return `
    <div class="tab-entry ${el === 1 ? "current" : ""}">
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
  }
}

export default TabEntry;
