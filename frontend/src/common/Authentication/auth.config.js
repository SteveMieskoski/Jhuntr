
configAuth.$inject = ['angularAuth0Provider', 'jwtOptionsProvider', '$httpProvider'];

export function configAuth (angularAuth0Provider, jwtOptionsProvider, $httpProvider) {

    angularAuth0Provider.init({
        clientID: 'T08jfrPqXTV0xE2K5pUF0vhCuXqmKDU1',
        domain: 'thatn3wguy.auth0.com'
    });

    jwtOptionsProvider
        .config({
            tokenGetter: ['options', function (options) {
                if (options && options.url.substr(options.url.length - 5) == '.html') {
                    return null;
                }
                var token = localStorage.getItem('id_token');
                if (token) {  //extra double quotes were being added to the token rendering it invalid
                    return token.slice(1, -1);
                }
                return localStorage.getItem('id_token'); // sends empty/null if no token is present.
            }],

            whiteListedDomains: ['localhost'],
            // unauthenticatedRedirectPath: '/home'
            unauthenticatedRedirectPath: '/login'
        });


    $httpProvider.interceptors.push('jwtInterceptor');

};


