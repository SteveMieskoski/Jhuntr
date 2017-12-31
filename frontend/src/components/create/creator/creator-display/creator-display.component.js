import controller from './creator-display.controller.js';

export const creatorDisplayComponent =  {
	bindings: {
		templateDetails: '<',
		sectionListModal: '<',
		templateData: '='
	},

	templateUrl: ['CreatorDataFactory', 'rootPath', '$location', '$element', '$attrs', (CreatorDataFactory, rootPath,  $location, $element, $attrs) => {
       /* let host = this.$location.host();
        let port = this.$location.port();
        if (!port) {
            return 'src/components/creator/creator-display/displayTemplates/' + CreatorDataFactory.templateDetails.name + '.html';
        } else {
            return 'src/components/creator/creator-display/displayTemplates/' + CreatorDataFactory.templateDetails.name + '.html';
        }*/
        return rootPath + '/creator-display/displayTemplates/' + CreatorDataFactory.templateDetails.name + '.html';
      //  return CreatorDataFactory.templateDetails.name + '.html';
	}],
    controller
};



