const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;
export default class CustomPalette {
  constructor(bpmnFactory,create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;


    
  

    function createServiceTask(suitabilityScore, name, id){
      return function(event) {
      
        
      const serviceTask = elementFactory.createShape({ type: 'bpmn:ServiceTask' });
      
      var urlInputParameter = bpmnFactory.create('camunda:InputParameter', {
        // type: 'string',
        name: 'url',
        value: 'http://localhost:8085/sample'
      });  

      var arr = [ {"id":"10", "class": "child-of-9"}, {"id":"11", "class": "child-of-10"}];
      for (var i = 0; i < arr.length; i++){
         
        var obj = arr[i];
        for (var key in obj){
          var values = obj[key];
          var methodInputParameter = bpmnFactory.create('camunda:InputParameter', {
            // type: 'string',
            name: key,
            value: values
          });  


        }
      }    
             
      var contentTypeInputParameter = bpmnFactory.create('camunda:InputParameter', {
        // type: 'string',
        name: 'Content-Type',
        value: 'application/json'
      });  
       var payloadInputParameter = bpmnFactory.create('camunda:InputParameter', {
        // type: 'string',
        name: 'payload',
        value: "lllll"
      }); 

       var responseOutPutParameter = bpmnFactory.create('camunda:OutputParameter', {
        // type: 'string',
        name: 'responsename',
        value: "${response}"
      });  

      var inputOutput = bpmnFactory.create('camunda:InputOutput', {
        inputParameters: [urlInputParameter,methodInputParameter,contentTypeInputParameter,
          payloadInputParameter ],   
          outputParameters: [responseOutPutParameter]  
      });  

      const connector = bpmnFactory.create("camunda:Connector", {
        connectorId: "http-connector", inputOutput
      });
      var extensionElements = bpmnFactory.create('bpmn:ExtensionElements', {
        values: [connector]
      });
      serviceTask.businessObject.set("extensionElements", extensionElements);
      serviceTask.businessObject.name = name;
      serviceTask.businessObject.id = id;
      create.start(event, serviceTask);
    };
  }

    return function (entries) {
      delete entries["create.group"];
      delete entries["create.participant-expanded"];

      entries["create.service-task"] = {
        group: 'activity',
        className: 'bpmn-icon-service-task',
        title: translate('Create ServiceTask'),
        action: {
          dragstart: createServiceTask(SUITABILITY_SCORE_LOW, "Service Task", "userTask"),
          click: createServiceTask(SUITABILITY_SCORE_LOW, "Service Task", "userTask")
        }
      };
      return entries;
    };
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
];