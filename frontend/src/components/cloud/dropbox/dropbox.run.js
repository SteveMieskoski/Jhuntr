DropboxRun.$inject = ['DropboxService', 'store', '$state'];

export function DropboxRun(DropboxService, store, $state) {

    if (store.get('dropbox') === 'get_access') {
        DropboxService.parseAccessTokenFromUrl()
            .then((response) => {
                $state.go('dropbox');
            })
            .catch((err) => {
                console.log('FAILED TO PARSE DROPBOX ACCESS TOKEN')
            })
    }

}