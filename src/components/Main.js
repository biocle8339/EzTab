import Component from "../core/Component.js";
import Contents from "./Contents.js";
import Navgation from "./Navigation.js";

class Main extends Component {
  setup() {
    this.state = { tabName: "currentTabs" };
  }

  template() {
    return `
    <main>
      <div class="navigation-container"></div>
    </main>
    `;
  }

  setEvent() {
    // this.addEvent("click", ".nav-link", function (event) {
    //   if (event.target.hasChildNodes) {
    //     console.log(
    //       event.target.querySelector("span").textContent.toLowerCase().trim()
    //     );
    //     this.setState({
    //       tabName: event.target
    //         .querySelector("span")
    //         .textContent.toLowerCase()
    //         .trim(),
    //     });
    //   }
    // });
  }

  mounted() {
    const $main = document.querySelector("main");
    const $navigationContainer = document.querySelector(
      ".navigation-container"
    );

    new Navgation($navigationContainer, { setTabName: this.setState });
    new Contents($main, { tabName: this.tabName });
  }
}

export default Main;
