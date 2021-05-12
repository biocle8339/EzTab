import Component from "../core/Component.js";
import TabGroup from "./TabGroup.js";

class TabGroups extends Component {
  template() {
    return `<div class="tab-groups"></div>`;
  }

  mounted() {
    const { index } = this.props;
    const $tabGroups = this.$target.querySelectorAll(".tab-groups")[index];

    const arr = [1, 2, 3];
    arr.forEach((el, i) => new TabGroup($tabGroups, { el, index: i }));
  }
}

export default TabGroups;
