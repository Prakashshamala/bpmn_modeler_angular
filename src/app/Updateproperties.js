 Modeler from "bpmn-js/lib/Modeler";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import "./styles.css";

import diagram from "./diagram.bpmn";

const container = document.getElementById("container");

const modeler = new Modeler({
  container,
  keyboard: {
    bindTo: document
  }
});

modeler
  .importXML(diagram)
  .then(({ warnings }) => {
    if (warnings.length) {
      console.log(warnings);
    }

    const canvas = modeler.get("canvas");
    const elementRegistry = modeler.get("elementRegistry");
    const modeling = modeler.get("modeling");

    canvas.zoom("fit-viewport");

    const shape = elementRegistry.get("StartEvent_1");
    modeling.updateProperties(shape, {
      name: "some         thing"
    });
  })
  .catch((err) => {
    console.log(err);
  });
