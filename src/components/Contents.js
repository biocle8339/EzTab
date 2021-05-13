import Component from "../core/Component.js";
import Search from "./Search.js";
import CurrentTabs from "./CurrentTabs.js";
import TabGroups from "./TabGroups.js";

class carousel extends Component {
  template() {
    return ``;
  }

  mounted() {
    const { tabName } = this.props;
    const $carousel = this.$target.querySelector(".carousel");

    if (tabName === "tabgroups") {
      new TabGroups($carousel);
      return;
    }

    new Search($carousel);

    const arr = [1, 2, 3];
    arr.map((el, i) => new CurrentTabs($carousel, { el, index: i }));
  }
}

export default carousel;
