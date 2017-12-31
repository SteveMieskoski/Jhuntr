mapConfigFunc.$inject = ['$sceDelegateProvider'];

export function mapConfigFunc($sceDelegateProvider) {
    'ngInject';
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://autocomplete.clearbit.com/**',
        'https://logo.clearbit.com/**'
    ]);
};