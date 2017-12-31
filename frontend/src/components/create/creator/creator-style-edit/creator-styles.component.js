import controller from './creator-style.controller.js';

export const creatorStyleComponent =  {
            bindings: {
                inputSelection: '@',
                existingData: '=',
                sectionsUpdate: '<',
                colorsUpdate: '='
            },
            templateUrl: ['rootPath', '$element', '$attrs', 'paths', (rootPath, $element, $attrs, paths) => {
                'ngInject';
                // let templateUrl = 'src/components/creator/designing/' + $attrs.inputSelection + '.html';
                let templateUrl = rootPath +'/creator-style-edit/styleTemplates/' + $attrs.inputSelection + '.html';
				//let templateUrl =  $attrs.inputSelection + '.html';
                return templateUrl;
            }],

            controller
        };



