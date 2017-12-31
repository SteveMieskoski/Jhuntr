
import Croppie2 from '../../../../vendor/croppie.js';
//export default Cropper;

EditorCropperDirective.$inject = ['$rootScope', 'EditorFactory'];

export function EditorCropperDirective($rootScope, EditorFactory) {
    return {
       restrict: 'E',
       require: {
            editorMain: "^^editorMain"
        },
        scope: {
            src: '=',
            ngModel: '=',
            imgHeight: '<',
            imgWidth: '<',
            imgShape: '<',
            closeCrop: '&',
            promiseData: '&'
        },
        priority: 120,
        link:linkfunc
    };

    function linkfunc(scope, element, attrs) {
        if (!scope.src) {
            return;
        }

        let crop = new Croppie2(element[0], {
            viewport: {
                width: scope.imgWidth ? scope.imgWidth : 500,
                height: scope.imgHeight ? scope.imgHeight : 1100,
                type: scope.imgShape ? scope.imgShape : 'square'
            },

            update: () => {
                crop.result({type: 'base64', circle: false})
                    .then((img) => {
                        scope.$apply(() => {
                            scope.ngModel = img;
                        });
                    });
            }
        });

        crop.bind({
            url: scope.src
        });

        var completeUnbind = $rootScope.$on('cropComplete', function () {
            scope.promiseData({cropData: crop.result({type: 'base64', circle: false})});
        });

        scope.$destroy = function () {
            completeUnbind();
        }
    }
}

