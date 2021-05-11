import Component from "../core/Component.js";
import TabEntry from "./TabEntry.js";

class TabList extends Component {
  template() {
    return `<div class="tab-list"></div>`;
  }

  mounted() {
    const $tabListArr = document.querySelectorAll(".tab-list");
    const $tabList = $tabListArr[$tabListArr.length - 1];

    // 나중에 여러개 대비해서
    // const { tabs } = this.props;
    // tabs.map((tab) => new TabEntry($tabList, tab));

    const tabs = [1, 2, 3, 4, 5];
    tabs.map((el) => new TabEntry($tabList, el));
    //new TabEntry($tabList);
  }
}

export default TabList;
