import { isAny } from "bpmn-js/lib/features/modeling/util/ModelingUtil";

export default class MyReplaceMenuProvider {
  constructor(popupMenu, bpmnReplace) {
    popupMenu.registerProvider("bpmn-replace", this);
    this.replaceElement = bpmnReplace.replaceElement;
  }

  getPopupMenuHeaderEntries(element) {
    return function (entries) {
      return entries;
    };
  }

  getPopupMenuEntries(element) {
    // const self = this;
    return function (entries) {
      if (isAny(element, ['bpmn:ManualTask','bpmn:UserTask'])) {
        entries = {
          // ...entries,
          "replace-with-conditional-start": {
            label: "Conditional Start Event",
            className: "bpmn-icon-start-event-condition",
            action: function () {
              console.log(self.replaceElement);
              return self.replaceElement(element, {
                type: "bpmn:StartEvent",
                eventDefinitionType: "bpmn:ConditionalEventDefinition"
              });
            }
          }
        };
      }
     return entries;
    };
  }
}

MyReplaceMenuProvider.$inject = ["popupMenu", "bpmnReplace"];
