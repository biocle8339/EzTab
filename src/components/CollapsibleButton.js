import Component from "../core/Component.js";

class CollapsibleButton extends Component {
  template() {
    const { el } = this.props;
    return `<button class="collapsible button">Open Section ${el}</button>`;
  }
}

export default CollapsibleButton;
