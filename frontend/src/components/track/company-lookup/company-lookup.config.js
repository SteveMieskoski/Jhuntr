configFunc.$inject = [ '$sceDelegateProvider'];

export function configFunc($sceDelegateProvider) {
    'ngInject';

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.opencorporates.com/**',
        'http://api.opencorporates.com/**',
        'http://ip-api.com/json',
        'https://autocomplete.clearbit.com/**',
        'https://logo.clearbit.com/**',
        'https://maps.googleapis.com/**'
    ]);

}