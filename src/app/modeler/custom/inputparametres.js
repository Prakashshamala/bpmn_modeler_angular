import BpmnJS from "bpmn-js/lib/Modeler";

import camundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";

import "bpmn-js/dist/assets/diagram-js.css";

import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import "./styles.css";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_01hdhpo" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.1.0">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="Event_1">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="Event_1" targetRef="Activity_1" />
    <bpmn:endEvent id="Event_2">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Activity_1" targetRef="Event_2" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_1wb8q35_di" bpmnElement="Flow_1">
        <di:waypoint x="215" y="177" />
        <di:waypoint x="270" y="177" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_04dusin_di" bpmnElement="Flow_2">
        <di:waypoint x="370" y="177" />
        <di:waypoint x="432" y="177" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="Event_1">
        <dc:Bounds x="179" y="159" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1378xg2_di" bpmnElement="Activity_1">
        <dc:Bounds x="270" y="137" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_07q0oe8_di" bpmnElement="Event_2">
        <dc:Bounds x="432" y="159" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;

const container = document.getElementById("container");

const bpmnJS = new BpmnJS({
  container,
  keyboard: {
    bindTo: document
  },
  moddleExtensions: {
    camunda: camundaModdlePackage
  }
});

bpmnJS.importXML(xml, err => {
  if (err) {
    console.error(err);
  }

  const bpmnFactory = bpmnJS.get("bpmnFactory"),
    elementRegistry = bpmnJS.get("elementRegistry"),
    modeling = bpmnJS.get("modeling");

  const inputParameter = bpmnFactory.create("camunda:InputParameter");

  inputParameter.name = "foo";
  inputParameter.value = "bar";

  const inputOutput = bpmnFactory.create("camunda:InputOutput");

  inputOutput.inputParameters = [inputParameter];

  inputParameter.$parent = inputOutput;

  const extensionElements = bpmnFactory.create("bpmn:ExtensionElements");

  inputOutput.$parent = extensionElements;

  extensionElements.values = [inputOutput];

  const task = elementRegistry.get("Activity_1");

  modeling.updateProperties(task, {
    extensionElements
  });

  console.log(task.businessObject);

  bpmnJS.saveXML({ format: true }, (err, xml) => console.log(xml));
});
