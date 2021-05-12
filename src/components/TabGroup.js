import Component from "../core/Component.js";
import CollapsibleButton from "./CollapsibleButton.js";
import Expansion from "./Expansion.js";

class TabGroup extends Component {
  template() {
    return `
    <div class="tab-group">
      <div class="buttons-container">
        <button class="delete button">X</button>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent("click", ".collapsible", function (event) {
      event.target.classList.toggle("active");
      const $expansion = event.target.parentNode.nextElementSibling;

      if ($expansion.style.maxHeight) {
        $expansion.style.maxHeight = null;
      } else {
        $expansion.style.maxHeight = $expansion.scrollHeight + "px";
      }
    });

    this.addEvent("click", ".delete", function (event) {
      event.target.closest(".tab-group").remove();
    });
  }

  mounted() {
    const { index } = this.props;
    const $tabGroup = this.$target.querySelectorAll(".tab-group")[index];
    const $deleteButtonContainer = $tabGroup.querySelector(
      ".buttons-container"
    );

    new CollapsibleButton($deleteButtonContainer, { ...this.props });
    new Expansion($tabGroup);
  }
}

export default TabGroup;
