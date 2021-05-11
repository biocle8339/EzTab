import Component from "../core/Component.js";

class Search extends Component {
  template() {
    return `
    <div class="search-container">
      <input
        class="search"
        type="text"
        placeholder="Search"
        autocomplete="off"
      />
    </div>
    `;
  }
}

export default Search;
