//"use strict";

export default  pageBreakDirective;

pageBreakDirective.$inject = ['$timeout', '$rootScope'];

function pageBreakDirective($timeout, $rootScope) {

    return {
        restrict: "EA",
        priority: 100,
        require: '^creatordisplay',
        link: linkFn
    };

    function linkFn(scope, Element, attrs, creatordisplayCtrl) {

        $timeout(function () {
            var elem = Element[0];
            //  console.log(angular.element(elem));
            heightCheck(elem, scope);
        }, 750);
        $rootScope.$on('recordItemChange', function () {
            $timeout(function () {
                heightCheck(Element[0], scope);
            }, 500);
        })
    }


    function heightCheck(elem, scope) {
        var spacerLine;
        var pageOffset = (1300 * Math.round((elem.offsetTop / 1050 )));
        if (elem.offsetTop + elem.scrollHeight > pageOffset && ((elem.offsetTop ) < pageOffset)) {
            // console.log(angular.element(elem));
            //  console.log(elem.offsetTop);
            // console.log((1100 * Math.round((elem.offsetTop / 1050 ))));
            //  console.log((1100 * Math.round((elem.offsetTop / 1050 ))));
            if (elem.offsetLeft < 50) {
                spacerLine = 'spacer-line'
            } else {
                spacerLine = '';
            }
            //var spacerHeight = elem.clientHeight + 20;
            var spacerHeight = (pageOffset - elem.offsetTop) + 20;
            var lineMargin = pageOffset - elem.offsetTop + 30;
            window.angular.element(elem)
                .prepend('<div page-link style="margin-bottom: 20px; " class="spacer-item"><hr class="' + spacerLine + '" style="margin-top: ' + lineMargin + 'px;"></div>');
        }
    }
};

