import BpmnJS from "bpmn-js/lib/Modeler";

import "bpmn-js/dist/assets/diagram-js.css";

// import BPMN font
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import camundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";
import camundaModdleExtension from "camunda-bpmn-moddle/lib";

import propertiesPanelModule from "bpmn-js-properties-panel";

import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";

import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import "./styles.css";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.3.5">
  <bpmn:process id="Process_1" isExecutable="true">
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const container = document.getElementById("container");

const bpmnJS = new BpmnJS({
  container,
  additionalModules: [
    {
      __init__: ["paletteProvider"]
    },
    camundaModdleExtension,
    propertiesPanelModule,
    propertiesProviderModule
  ],
  keyboard: {
    bindTo: document
  },
  moddleExtensions: {
    camunda: camundaModdlePackage
  },
  propertiesPanel: {
    parent: "#properties"
  }
});

var editingPalette = document.getElementsByClassName("djs-palette")[0];
editingPalette.outerHTML = "";

var actions = document.getElementsByClassName("entry");
console.log(actions.length);

bpmnJS.importXML(xml, (err) => {
  if (err) {
    console.error(err);
  }

  const canvas = bpmnJS.get("canvas");

  canvas.zoom("fit-viewport");
});

const bpmnFactory = bpmnJS.get("bpmnFactory"),
  elementFactory = bpmnJS.get("elementFactory"),
  elementRegistry = bpmnJS.get("elementRegistry"),
  modeling = bpmnJS.get("modeling");

var button = document.getElementById("test");

button.onclick = function () {
  const process = elementRegistry.get("Process_1");

  const taskBusinessObject = bpmnFactory.create("bpmn:Task", {
    name: "Task"
  });

  const task = elementFactory.createShape({
    type: "bpmn:Task",
    businessObject: taskBusinessObject
  });

  const inputParameters = [],
    outputParameters = [];

  const inputParameter1 = bpmnFactory.create("camunda:InputParameter", {
    name: "FirstStr"
  });

  const inputParameter2 = bpmnFactory.create("camunda:InputParameter", {
    name: "SecondStr"
  });

  inputParameters.push(inputParameter1);
  inputParameters.push(inputParameter2);

  const outputParameter1 = bpmnFactory.create("camunda:InputParameter", {
    name: "Result"
  });

  outputParameters.push(outputParameter1);

  const inputOutput = bpmnFactory.create("camunda:InputOutput", {
    inputParameters: inputParameters,
    outputParameters: outputParameters
  });

  const extensionElements = bpmnFactory.create("bpmn:ExtensionElements", {
    values: [inputOutput]
  });

  task.businessObject.extensionElements = extensionElements;

  modeling.createShape(task, { x: 400, y: 100 }, process);
};

var exportDiagram = document.getElementById("exportDiagram");

exportDiagram.onclick = async function exportDiagram() {
  try {
    var result = await bpmnJS.saveXML({ format: true });

    alert("Diagram exported. Check the developer tools!");

    console.log(result.xml);
  } catch (err) {
    console.error("could not save BPMN 2.0 diagram", err);
  }
};

function test() {
  alert("test");
}
