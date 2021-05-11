import Component from "../core/Component.js";
import TabEntry from "./TabEntry.js";

class TabList extends Component {
  template() {
    return `<div class="tab-list"></div>`;
  }

  mounted() {
    const $tabList = document.querySelector(".tab-list");

    // 나중에 여러개 대비해서
    // const { tabs } = this.props;
    // tabs.map((tab) => new TabEntry($tabList, tab));

    const tabs = [1, 2, 3, 4, 5];
    tabs.map((el, i) => new TabEntry($tabList, { el, index: i }));
  }
}

export default TabList;
