import Component from "../core/Component.js";
import Search from "./Search.js";
import TabsContainer from "./TabsContainer.js";

class Contents extends Component {
  template() {
    return `<div class="contents"></div>`;
  }

  mounted() {
    const $contents = document.querySelector(".contents");

    new Search($contents);

    const arr = [1, 2, 3];
    arr.map((el, i) => new TabsContainer($contents, { el, index: i }));
  }
}

export default Contents;
