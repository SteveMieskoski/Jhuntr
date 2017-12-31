

export const GapiConstants = {
    apis:[],
    apiKey: null,
    applicationId: '1085474001893',
    clientId: '1085474001893-fdgbigtpkcoofm3s9mgg06tfhfonhea8.apps.googleusercontent.com',
    scopes: {
        tasks: 'https://www.googleapis.com/auth/tasks.readonly',
       // drive: ['email', 'profile', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.install']
        drive : [ 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.readonly', 'profile', 'email'],
        test: 'profile email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.readonly'
    },
    loadApis: {'drive' : 'v2'},
    discoveryDocs: {
        drive: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        tasks: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"]
    }
};


