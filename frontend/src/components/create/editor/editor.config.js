

EditorConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export function EditorConfig($stateProvider, $urlRouterProvider) {


    var appStates = [        {
        name: 'resselect',
        url: '/resume_select?post',
        component: 'resListor',
        resolve: {
            resumeList: ['CreatorDataFactory',  function (CreatorDataFactory) {
                "ngInject";
                return CreatorDataFactory.getResList();
            }]
        }
    },         {
        name: 'editing',
        url: '/editor?post',
        component: 'editorMain',
        resolve: {
            initData:  ['EditorDataFactory', '$stateParams', function (EditorDataFactory, $stateParams) {
                "ngInject";
                return EditorDataFactory.getInitResData($stateParams.post)
            }],
            templateDetails:  ['EditorDataFactory', '$stateParams', function (EditorDataFactory, $stateParams) {
                "ngInject";
                return EditorDataFactory.getInitTemplateData($stateParams.post);
            }],
            postContent: ['EditorDataFactory', '$stateParams', function (EditorDataFactory, $stateParams) {
                "ngInject";
                return EditorDataFactory.getOnePost($stateParams.post);
            }]
        }
    }];

    appStates.forEach(function (appState) {
        $stateProvider.state(appState);
    });

    $urlRouterProvider.otherwise('/');
}