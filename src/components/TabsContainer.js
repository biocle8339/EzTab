import Component from "../core/Component.js";
import TabList from "./TabList.js";
import TabsHeader from "./TabsHeader.js";

class TabsContainer extends Component {
  template() {
    return `<div class="tabs-container"></div>`;
  }

  mounted() {
    const { index } = this.props;
    const $tabsContainer = this.$target.querySelectorAll(".tabs-container")[
      index
    ];

    new TabsHeader($tabsContainer);
    new TabList($tabsContainer);
  }
}

export default TabsContainer;
