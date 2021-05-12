import Component from "../core/Component.js";
import TabList from "./TabList.js";

class Expansion extends Component {
  template() {
    return `<div class="expansion"></div>`;
  }

  mounted() {
    const { index } = this.props;
    const $expansion = this.$target.querySelectorAll(".expansion")[index];

    new TabList($expansion);
  }
}

export default Expansion;
