import Component from "../core/Component.js";
import TabList from "./TabList.js";
import TabsHeader from "./TabsHeader.js";

class CurrentTabs extends Component {
  template() {
    return `<div class="current-tabs"></div>`;
  }

  mounted() {
    const { index } = this.props;
    const $currentTabs = this.$target.querySelectorAll(".current-tabs")[index];

    new TabsHeader($currentTabs);
    new TabList($currentTabs);
  }
}

export default CurrentTabs;
