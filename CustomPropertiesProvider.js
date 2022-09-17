import { is } from "bpmn-js/lib/util/ModelUtil";

var LOW_PRIORITY = 500;

function CustomPropertiesProvider(propertiesPanel) {
  propertiesPanel.registerProvider(LOW_PRIORITY, this);

  this.getTabs = function (element) {
    return function (tabs) {
      const general = tabs.find(({ id }) => id === "general");

      if (!general) {
        return tabs;
      }

      const generalGroup = general.groups.find(({ id }) => id === "general");

      if (!generalGroup) {
        return tabs;
      }

      const idEntry = generalGroup.entries.find(({ id }) => id === "id");

      if (is(element, "bpmn:Process") && idEntry) {
        generalGroup.entries.splice(generalGroup.entries.indexOf(idEntry), 1);
      }

      return tabs;
    };
  };
}

CustomPropertiesProvider.$inject = ["propertiesPanel"];

export default {
  __init__: ["customPropertiesProvider"],
  customPropertiesProvider: ["type", CustomPropertiesProvider]
};
