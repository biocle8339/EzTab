import Component from "../core/Component.js";
import Header from "./Header.js";
import Main from "./Main.js";

class App extends Component {
  mounted() {
    new Header(this.$target);
    new Main(this.$target);
  }
}

export default App;
