import Croppie from '../../../../../node_modules/croppie/croppie.js';

export function ImageCropDirective() {
    return {
        restrict: 'E',
        scope: {
            src: '=',
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            if (!scope.src) {
                return;
            }

            var crop = new Croppie(element[0], {
                viewport: {
                    width: 150,
                    height: 150,
                    type: 'circle'
                },
                update: function () {
                    crop.result({type: 'base64', circle: false}).then(function (img) {
                        scope.$apply(function () {
                            scope.ngModel = img;
                        });
                    });
                }
            });
            crop.bind({
                url: scope.src
            });
        }
    };
}
