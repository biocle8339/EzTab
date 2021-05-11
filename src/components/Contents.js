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
    new TabsContainer($contents);
    new TabsContainer($contents);
  }
}

export default Contents;
