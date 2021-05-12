import Component from "../core/Component.js";
import Search from "./Search.js";
import CurrentTabs from "./CurrentTabs.js";
import TabGroups from "./TabGroups.js";

class Contents extends Component {
  template() {
    return `<div class="contents"></div>`;
  }

  mounted() {
    const { tabName } = this.props;
    const $contents = this.$target.querySelector(".contents");

    if (tabName === "tabgroups") {
      new TabGroups($contents);
      return;
    }

    new Search($contents);

    const arr = [1, 2, 3];
    arr.map((el, i) => new CurrentTabs($contents, { el, index: i }));
  }
}

export default Contents;
