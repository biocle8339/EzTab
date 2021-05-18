import "./popup.css";
import Controller from "./controller.js";
import Model from "./model.js";
import View from "./view.js";

const init = () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  // await model.setInitialState();
  controller.init();
  console.log("popup init");
};

init();
