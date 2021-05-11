import Component from "../core/Component.js";

class Navigation extends Component {
  template() {
    return `
    <div class="navigation-container">
      <nav class="navigation">
        <div class="link-container">
          <a href="#" class="nav-link">Current Tabs</a>
          <a href="#" class="nav-link">Tab Groups</a>
          <a href="#" class="nav-link">Tab Usage</a>
        </div>
        <div class="marker"></div>
      </nav>
    </div>
  `;
  }
}

export default Navigation;
