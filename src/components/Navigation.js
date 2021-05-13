import Component from "../core/Component.js";

class Navigation extends Component {
  template() {
    return `
      
  `;
  }

  setEvent() {
    // const { setTabName } = this.props;

    // this.addEvent("click", ".nav-link", function (event) {
    //   const $marker = event.currentTarget.querySelector(".marker");
    //   $marker.style.width = `${event.target.offsetwidth}px`;
    //   $marker.style.transform = `translateX(${
    //     event.target.closest(".nav-link").dataset.distance
    //   }px`;

    //   //bind써야함
    //   console.log(event.target.textContent.toLowerCase().replaceAll(/\s/g, ""));
    //   // if (event.target.hasChildNodes) {

    //   //   setTabName({
    //   //     tabName: event.target
    //   //       .querySelector("span")
    //   //       .textContent.toLowerCase()
    //   //       .replaceAll(/\s/g, ""),
    //   //   });
    //   // }

    //   setTabName({ tabName: event.target.textContent.toLowerCase().trim() });
    // });
    this.setTabName();
  }
}

export default Navigation;
