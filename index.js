import BpmnJS from "bpmn-js/lib/Modeler";

import camundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";
import camundaModdleExtension from "camunda-bpmn-moddle/lib";

import "bpmn-js/dist/assets/diagram-js.css";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import "./styles.css";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0g0shz3" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.1.0">
  <bpmn:process id="Process_1pgrdw2" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_0is99tw</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_0is99tw" sourceRef="StartEvent_1" targetRef="Activity_0il3f44" />
    <bpmn:task id="Activity_0il3f44">
      <bpmn:incoming>Flow_0is99tw</bpmn:incoming>
      <bpmn:outgoing>Flow_13slbwx</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="Event_06gi9wx">
      <bpmn:incoming>Flow_13slbwx</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_13slbwx" sourceRef="Activity_0il3f44" targetRef="Event_06gi9wx" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1pgrdw2">
      <bpmndi:BPMNEdge id="Flow_0is99tw_di" bpmnElement="Flow_0is99tw">
        <di:waypoint x="215" y="117" />
        <di:waypoint x="270" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_13slbwx_di" bpmnElement="Flow_13slbwx">
        <di:waypoint x="370" y="117" />
        <di:waypoint x="432" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="99" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_161sj74_di" bpmnElement="Activity_0il3f44">
        <dc:Bounds x="270" y="77" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_06gi9wx_di" bpmnElement="Event_06gi9wx">
        <dc:Bounds x="432" y="99" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;

const container = document.getElementById("container");

const modeler = new BpmnJS({
  container,
  additionalModules: [camundaModdleExtension],
  moddleExtensions: {
    camunda: camundaModdlePackage
  },
  keyboard: {
    bindTo: document
  }
});

modeler
  .importXML(xml)
  .then(async () => {
    const elementRegistry = modeler.get("elementRegistry"),
      bpmnFactory = modeler.get("bpmnFactory");

    const task = elementRegistry.get("Activity_0il3f44");

    // create input
    createInputParameter(task, bpmnFactory);

    // update input
    updateFirstInputParameter(task, "bar");

    // verify it works
    const { xml } = await modeler.saveXML();

    console.log(xml);
  })
  .catch(err => {
    return console.error(err);
  });

function createInputParameter(task, bpmnFactory) {
  const inputParameter = bpmnFactory.create("camunda:InputParameter", {
    name: "input1",
    value: "foo"
  });

  const inputOutput = bpmnFactory.create("camunda:InputOutput", {
    inputParameters: [inputParameter]
  });

  const extensionElements = bpmnFactory.create("bpmn:ExtensionElements", {
    values: [inputOutput]
  });

  task.businessObject.extensionElements = extensionElements;
}

function updateFirstInputParameter(task, newValue) {
  const extensionElements = task.businessObject.get("extensionElements");

  const inputOutput = getInputOutput(extensionElements)[0];

  const firstInput = inputOutput.get("inputParameters")[0];

  firstInput.value = newValue;
}

function getInputOutput(extensionElements) {
  const values = extensionElements.get("values");

  if (typeof values !== "undefined") {
    const elements = values.filter(function(value) {
      return value.$type === "camunda:InputOutput";
    });

    if (elements.length) {
      return elements;
    }
  }
}
