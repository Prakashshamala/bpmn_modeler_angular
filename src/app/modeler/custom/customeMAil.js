function createTask(name, id) {
      return function (event) {
        const serviceTask = elementFactory.createShape({
          type: "bpmn:ServiceTask"
        });
        var urlInputParameter = bpmnFactory.create('camunda:InputParameter', {
          // type: 'string',
          name: 'url',
          value: 'http://localhost:8085/sample'
        });       
        var methodInputParameter = bpmnFactory.create('camunda:InputParameter', {
          // type: 'string',
          name: 'method',
          value: 'POST'
        });          
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
	
	
	return {
      'create.low-task': {
        group: 'activity',
        className: 'bpmn-icon-service-task red',
        title: translate('Test Service Task'),
        action: {
          dragstart: createTask("Test name", "test"),
          click: createTask("Test name", "test")
        }
      },