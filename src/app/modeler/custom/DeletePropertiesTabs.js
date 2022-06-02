var LOW_PRIORITY = 500;
export default function DeletePropertiesTabs(propertiesPanel, translate) {
this.getTabs = function (element) {
    return function (entries) {
      const generalTab = entries.find((e) => e.id === "general");
      entries.splice(generalTab, 1);
      return entries;
    };
  };
  propertiesPanel.registerProvider(LOW_PRIORITY, this);
}

DeletePropertiesTabs.$inject = ["propertiesPanel", "translate"];