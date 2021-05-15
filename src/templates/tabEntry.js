const generateTabEntryTemplate = (tab) => {
  const title =
    tab.title.length >= 40 ? tab.title.slice(0, 40) + "..." : tab.title;
  return `
  <div class="tab-entry ${tab.active ? "current" : ""}">
    <div class="entry-button-container entry-copy-button" data-tab-url=${
      tab.url
}>
      <img class="icon copy-icon" src="./assets/images/copy-icon.png" />
    </div>
    <button class="tab-title-button">
      <h3 class="tab-title">${title}</h3>
    </button>
    <div class="entry-button-container entry-delete-button" data-tab-id=${
  tab.id
    }>
      <img class="icon delete-icon" src="./assets/images/delete-icon.png" />
    </div>
  </div>
  `;
};

export default generateTabEntryTemplate;
