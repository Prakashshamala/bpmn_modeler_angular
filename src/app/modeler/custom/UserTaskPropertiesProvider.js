// Require your custom property entries.
import spellProps from "./SpellProps";

var LOW_PRIORITY = 500;

// Create the custom magic tab.
// The properties are organized in groups.
function createCustomTabGroups(element, translate) {
  // Create a group called "Black Magic".
  var customNameGroup = {
    id: "black-magic",
    label: "Black Magic",
    entries: []
  };

  // Add the spell props to the black magic group.
  spellProps(customNameGroup, element, translate);

  return [customNameGroup];
}

export default function UserTaskPropertiesProvider(propertiesPanel, translate) {
  this.getTabs = function (element) {
    return function (entries) {
      // Add the "magic" tab
      var magicTab = {
        id: "custom",
        label: "custom",
        groups: createCustomTabGroups(element, translate)
      };

      entries.push(magicTab);

      // Show general + "magic" tab
      return entries;
    };
  };

  // Register our custom magic properties provider.
  // Use a lower priority to ensure it is loaded after the basic BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

UserTaskPropertiesProvider.$inject = ["propertiesPanel", "translate"];
