var LOW_PRIORITY = 500;
import customProps from "./CustomProps";
export default function DeletePropertiesTabs(propertiesPanel, translate) {
  this.getTabs = function (element) {
    return function (entries) {
      const formTab = entries.find((e) => e.id === "forms");
      const groups = formTab.groups;
      const CustomTabGroup = {
        id: "Custom-Id",
        label: "Custom Id",
        entries: []
      };
      customProps(CustomTabGroup, element, translate);
      groups.push(CustomTabGroup);
      return entries;
    };
    };
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}
DeletePropertiesTabs.$inject = ["propertiesPanel", "translate"];