import Component from "../core/Component.js";
import TabList from "./TabList.js";
import TabsHeader from "./TabsHeader.js";

class TabsContainer extends Component {
  template() {
    return `<div class="tabs-container"></div>`;
  }

  mounted() {
    const $tabsContainerArr = document.querySelectorAll(".tabs-container");
    const $tabsContainer = $tabsContainerArr[$tabsContainerArr.length - 1];

    new TabsHeader($tabsContainer);
    new TabList($tabsContainer);
  }
}

export default TabsContainer;
