export const editorRoutes = { //modRoutes as in Module Routes
	creator: {
		list: '/creator/list/',
		createNew: '/creator/createNew/',
		updateLabel: '/creator/updatelabel/',
		retrieve: '/creator/retrieve/',
		add: '/creator/add/',
		update: '/creator/update/',
		remove: '/creator/remove/',
		sectionsUpdate: '/creator/sectionsUpdate/',
		sectionsCreate: '/creator/sectionsCreate/',
		removeRes: '/creator/removeRes/'
	},
	converter: {
		downloadMain: '/converter/downloadMain/',
		processed: '/converter/processed/',
		toEdit: '/converter/toEdit/'
	},
	listor: {
		list: '/listor/list/',
		checkOnePost: '/listor/checkPost/',
		retrieveOnePost: '/listor/retrieveOnePost/',
		removeRes: '/listor/removeRes/'

	},
	posting: {
		getImage: '/posting/getImage/',
		update: '/posting/update/'

	}
};

export const editorPaths = {
	paths: {
		displayTemplatePath: 'src/components/creator/features/displayTemplates/',
		displaySectionPath: 'src/components/creator/features/displayTemplates/sections/',
		styleTemplatePath: 'src/components/creator/features/styleTemplates/',
		inputTemplatePath: 'src/components/creator/features/inputTemplates/'
	}
};


