import entryFactory from  "bpmn-js-properties-panel/lib/factory/EntryFactory";

import { is } from "bpmn-js/lib/util/ModelUtil";

export default function (group, element, translate) {
  // Only return an entry, if the currently selected
  // element is a start event.

  if (is (element, ["bpmn:UserTask"])) {
    
    group.entries.push(
      entryFactory.textField(translate, {
        id: "Name",
        description: "Apply Custom Tab",
        label: "Name",
        modelProperty: "Name"
      })
    );
  }
  if (is (element, ["bpmn:ManualTask"])) {
    group.entries.push(
      entryFactory.textField(translate, {
        id: "Name",
        description: "Apply Custom Tab",
        label: "Name",
        modelProperty: "Name"
      })
    );
  
  group.entries.push(entryFactory.textField(translate, {
    id : 'dueDate',
    description : translate('The due date as an EL expression (e.g. ${someDate} or an ISO date (e.g. 2015-06-26T09:54:00)'),
    label : translate('Due Date'),
    modelProperty : 'dueDate'
  }));
}
}
