import Component from "../core/Component.js";

class Navigation extends Component {
  template() {
    return `
      <nav class="navigation">
        <div class="link-container">
          <div class="nav-link" data-distance="0"><span>Current Tabs</span></div>
          <div class="nav-link" data-distance="170"><span>Tab Groups</span></div>
          <div class="nav-link" data-distance="328"><span>Tab Usage</span></div>
        </div>
        <div class="marker"></div>
      </nav>
  `;
  }

  setEvent() {
    const { setTabName } = this.props;

    this.addEvent("click", ".nav-link", function (event) {
      const $marker = event.currentTarget.querySelector(".marker");
      $marker.style.width = `${event.target.offsetwidth}px`;
      $marker.style.transform = `translateX(${
        event.target.closest(".nav-link").dataset.distance
      }px`;

      //bind써야함
      console.log(event.target);
      // if (event.target.hasChildNodes) {

      //   setTabName({
      //     tabName: event.target
      //       .querySelector("span")
      //       .textContent.toLowerCase()
      //       .trim(),
      //   });
      // }

      setTabName({ tabName: event.target.textContent.toLowerCase().trim() });
    });
  }
}

export default Navigation;
