import parseHTML from "../utils/parseHTML.js";

class Component {
  $target;
  state;
  props;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  mounted() {}

  template() {
    return "";
  }

  render() {
    const $template = parseHTML(this.template());
    this.$target.appendChild($template);
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) {
        return false;
      }

      callback(event);
    });
  }
}

export default Component;
