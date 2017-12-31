
//export default popTriggerDirective;

export function popTriggerDirective() {
    return {
        restrict: "EA",
        priority: 80,
        link: linkFn,
        scope: {
            openPopover: '&popoverOpen',
            popTrigger: '<'
        },
        transclude: true,
        template: '<div ng-click="openPopover({value: true, section: section})"' +
        ' ng-mouseenter="openPopover({value:\'alt\', section: section})"' +
        ' ng-mouseleave="openPopover({value:false, section: section})" ng-transclude></div>'
    };

    function linkFn(scope, elem, attrs) {
        scope.section = scope.popTrigger;
        console.log(scope.popTrigger)
    }
};
