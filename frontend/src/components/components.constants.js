export const componentRoutes = { //modRoutes as in Module Routes
	creator: {
		list: '/creator/list/',
		templateDetails: '/creator/templateDetails/',
		createNew: '/creator/createNew/',
		copy: '/creator/copy/',
		copyToPosting: '/creator/copyToPosting/',
		updateLabel: '/creator/updatelabel/',
		retrieve: '/creator/retrieve/',
		add: '/creator/add/',
		update: '/creator/update/',
		remove: '/creator/remove/',
		retrieveMaster: '/creator/retrieveMaster/',
		sectionsUpdate: '/creator/sectionsUpdate/',
		sectionsCreate: '/creator/sectionsCreate/',
		setMaster: '/creator/setMaster/',
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
		update: '/posting/update/',
		updateRemarks: '/posting/updateRemarks/'
	},
	user: {
		addTask: '/user/addTask/',
		addReminder: '/user/addReminder/',
		deleteTask: '/user/deleteTask/',
		deleteReminder: '/user/deleteReminder/',
		details: '/user/details/',
		updateTask: '/user/updateTask/',
		updateReminder: '/user/updateReminder/'
	}
};

export const componentPaths = {
	displayTemplatePath: 'src/components/creator/features/displayTemplates/',
	displaySectionPath: 'src/components/creator/features/displayTemplates/sections/',
	styleTemplatePath: 'src/components/creator/creator-style-edit/styleTemplates/',
	inputTemplatePath: 'src/components/creator/features/inputTemplates/'
};



