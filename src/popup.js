import Controller from "./controller.js";
import View from "./view.js";

const init = () => {
  const view = new View();
  new Controller(null, view);
};

init();
