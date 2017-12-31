export const endPoints = { //modRoutes as in Module Routes
	creator: {
		list: '/creator/list/',
		templateDetails: '/creator/templateDetails/',
		createNew: '/creator/createNew/',
		createNewAlt: '/creator/createNewAlt/',
		copy: '/creator/copy/',
		copyToPosting: '/creator/copyToPosting/',
		updateLabel: '/creator/updateMeta/',
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
		updateRemarks: '/posting/updateRemarks/',
		removePosting: '/posting/removePosting/',
		addPlainPost: '/posting/addPlainPost/',
        getStatuses: '/posting/getStatuses/',
        updateStatuses: '/posting/updateStatuses/',
        updatePostTaskList: '/posting/updatePostTaskList/'
	},
	user: {
		addTask: '/user/addTask/',
		addReminder: '/user/addReminder/',
		associate: '/user/associate',
		deleteTask: '/user/deleteTask/',
		deleteReminder: '/user/deleteReminder/',
        removeSkill: '/user/removeSkill/',
		updateTask: '/user/updateTask/',
		updateReminder: '/user/updateReminder/',
        update : '/user/update/',
        user: '/user/',
        updateSkills: '/user/updateSkills/'
	},
    integrations: {
		cloud:{
            dropbox: {
                downloadFile: '/cloud/dropbox/downloadFile/'
            }
		},
		services:{
			companyLookup: '/services/companyLookup'
		}

	}
};

export const componentPaths = {
	displayTemplatePath: 'src/components/creator/features/displayTemplates/',
	displaySectionPath: 'src/components/creator/features/displayTemplates/sections/',
	styleTemplatePath: 'src/components/creator/features/styleTemplates/',
	inputTemplatePath: 'src/components/creator/features/inputTemplates/'
};


// mostly just here for my own easy reference (maybe I'll import it at some point)
export const alternateResSchemas = {
    dropboxRef: 'dropboxRef',
    driveRef: 'driveRef'
};


