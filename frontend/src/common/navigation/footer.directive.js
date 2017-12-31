//"use strict";

footerShowDirective.$inject = ['$window', '$timeout'];

export function footerShowDirective($window, $timeout) {

    function getWindowScrollTop() {
        if (window.angular.isDefined($window.pageYOffset)) {
            return $window.pageYOffset;
        } else {
            var iebody = (document.compatMode && document.compatMode !== 'BackCompat') ? document.documentElement : document.body;
            return iebody.scrollTop;
        }
    }

    function getWindowScrollHeight() {
        return ($window.document.body.scrollHeight - $window.innerHeight);
    }

    function getWindowHeight(contentHeight) {
        return (contentHeight ? $window.document.body.clientHeight : $window.innerHeight);
    }

    return {
        require: ['footerShow', '^?targetWindow'],
        restrict: "A",
        scope: {
            showValue: '<'
        },
        link: linkFn,
        controller: controllerFn
    };

    //-----------

    function controllerFn() {
        var vm = this;

        this.$element = undefined;
        this.$target = undefined;

        this.ready = false;
        this.enabled = true;

        this.setTarget = function () {
            this.$target = window.angular.element($window);
        };

        this.onScroll = function () {
            if (!vm.ready || !vm.enabled) {
                return;
            }
        };

    }


    function linkFn(scope, element, attrs, ctrl) {

        let uiScrollpoint = ctrl[0];
        let uiScrollpointTarget = ctrl[1];

        uiScrollpoint.setTarget(uiScrollpointTarget ? uiScrollpointTarget.$element : null);


        function scrollListen() {
            uiScrollpoint.$target.on('scroll', function () {
                uiScrollpoint.onScroll();
                let total = getWindowScrollHeight();
                let current = getWindowScrollTop();

                if (current >= (total - scope.showValue)) {
                    if (!element.hasClass('show-footer')) {
                        console.log('SHOW');

                        element.removeClass('hidden-footer');
                        element.addClass('show-footer');
                    }
                } else {
                    if (!element.hasClass('hidden-footer')) {
                        element.addClass('hidden-footer');
                        element.removeClass('show-footer');
                    }
                }
            });

            scope.$on('$destroy', function () {
                uiScrollpoint.$target.off('scroll', uiScrollpoint.onScroll);
            });
        }

        function addCss() {
            $timeout(function () {
                let height = getWindowScrollHeight().toString();
                element.css('height', height);
            })
        }


        element.ready(function () {
            uiScrollpoint.ready = true;
            scrollListen();
            $timeout(function () {
                if (getWindowScrollHeight() <= 70) {
                    if (!element.hasClass('show-footer')) {
                        element.removeClass('hidden-footer');
                        element.addClass('show-footer');
                    }
                }
            }, 1000)

        });
    }
}

