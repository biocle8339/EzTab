import Component from "../core/Component.js";

class Header extends Component {
  template() {
    return `
    <header>
      <img class="logo" src="./images/logo.png" />
    </header>
  `;
  }
}

export default Header;
