import Component from "../core/Component.js";
import Contents from "./Contents.js";
import Navgation from "./Navigation.js";

class Main extends Component {
  template() {
    return `<main></main>`;
  }

  mounted() {
    const $main = document.querySelector("main");

    new Navgation($main);
    new Contents($main);
  }
}

export default Main;
