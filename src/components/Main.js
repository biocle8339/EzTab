import Component from "../core/Component.js";
import Contents from "./Contents.js";
import Navgation from "./Navigation.js";

class Main extends Component {
  setup() {
    this.state = {
      tabName: "currenttabs",
      setTabName: this.addEvent("click", ".nav-link", function (event) {
        const target =
          event.target.tagName.toLowerCase() === "span" ? event.target : "x";

        console.log(target);
        if (event.target.hasChildNodes) {
          this.setState({
            ...this.state,
            tabName: event.target
              .querySelector("span")
              .textContent.toLowerCase()
              .replaceAll(/\s/g, ""),
          });
        }
      }),
    };
  }

  template() {
    return `
    
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
