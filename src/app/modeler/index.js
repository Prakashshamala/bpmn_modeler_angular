import Modeler from "bpmn-js/lib/Modeler";

import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleExtension from "camunda-bpmn-moddle/lib";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda.json";

import "./styles.css";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.3.5">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="82" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const container = document.getElementById("container");

class CustomModeler extends Modeler {}

CustomModeler.prototype._modules = [
  ...Modeler.prototype._modules,
  propertiesPanelModule,
  propertiesProviderModule
];

const modeler = new CustomModeler({
  container,
  keyboard: {
    bindTo: document
  },
  propertiesPanel: {
    parent: "#properties-panel-parent"
  },
  additionalModules: [camundaModdleExtension],
  moddleExtensions: {
    camunda: camundaModdleDescriptor
  }
});

modeler.importXML(xml, err => {
  if (err) {
    console.error(err);
  }

  const canvas = modeler.get("canvas");

  canvas.zoom("fit-viewport");
});
