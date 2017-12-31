//"use strict";

export default  pageLinkDirective;

pageLinkDirective.$inject = ['$timeout', '$rootScope'];

function pageLinkDirective($timeout, $rootScope) {

    return {
        restrict: "EA",
        priority: 90,
        require: '^creatordisplay',
        link: linkFn
    };

    function linkFn(scope, Element, tAttrs, creatordisplayCtrl) {

        var elem = Element[0];
        removalCheck(elem);

        $rootScope.$on('recordItemChange', function(){
            removalCheck(elem);
        });

        function removalCheck(elem){
            for(var i=0; i< elem.children.length; i++){
                if(elem.children[i].className == 'spacer-item'){
                    elem.children[i].remove();
                }
            }
        }
    }


}