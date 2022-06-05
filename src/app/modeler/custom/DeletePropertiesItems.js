var LOW_PRIORITY = 500;
export default function DeletePropertiesItems(propertiesPanel, translate) {
    propertiesPanel.registerProvider(LOW_PRIORITY, this);
    this.getTabs = function (element) {
        return function (entries) {
            const formTab = entries.find((e) => e.id === "general");
            if (!formTab) {
                return entries;
            }
            const groups = formTab.groups;
            groups.splice(2);
            return entries;
        };
    };
    propertiesPanel.registerProvider(LOW_PRIORITY, this);
}
DeletePropertiesItems.$inject = ["propertiesPanel", "translate"];

