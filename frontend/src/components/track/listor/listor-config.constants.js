//const listorConfigConstants =
export const listorConfigConstants = {
    routes: { //modRoutes as in Module Routes
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
            removeRes: '/listor/removeRes/'
        },
        posting: {
            getImage: '/posting/getImage/',
            update: '/posting/update/'
        }
    }, paths: {
        displayTemplatePath: 'src/components/creator/features/displayTemplates/',
        displaySectionPath: 'src/components/creator/features/displayTemplates/sections/',
        styleTemplatePath: 'src/components/creator/features/styleTemplates/',
        inputTemplatePath: 'src/components/creator/features/inputTemplates/'
    }
}