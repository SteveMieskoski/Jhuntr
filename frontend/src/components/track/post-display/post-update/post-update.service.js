let PostUpdateServiceInjectables = ['$rootScope', '$uibModal', 'LocationParserService', 'ListorDataFactory'];

export class PostUpdateService {
    constructor($rootScope, $uibModal, LocationParserService, ListorDataFactory) {
        this._$rootScope = $rootScope;
        this._$uibModal = $uibModal;
        this._ListorDataFactory = ListorDataFactory;
        this._LocationParserService = LocationParserService;
    }

    // note: don't like this but it works (for now)
    checkForAdditionalUpdates(currentData, originalData){
        return new Promise((resolve, reject) =>{
            if(!window.angular.equals(originalData.location, currentData.location)){
                console.log('new location');
                this._LocationParserService.getCoordinates(currentData.location)
                    .then((response) =>{
                    if(response.lat && response.long){
                        currentData.lat = response.lat;
                        currentData.long = response.long;
                    }
                    for(let prop in response){
                        if(prop !== 'lat' && prop !== 'long'){
                            currentData[prop] = response[prop]
                        }
                    }
                    resolve(currentData);
                    })
            } else {
                resolve(currentData);
            }
        })
    }

    updatePost(postId, data){
        return  this._ListorDataFactory.update(postId, data)
            .then((response) =>{
                console.log('update post response', response);
                this._$rootScope.$emit('updateStatues');
                return response;
            })
            .catch((error) =>{
                console.log('update post response ERROR', error);
            })
    }

    additionalFieldsModal() {
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'statusLabelChange',
            resolve: {
                postData: () => {
                    return window.angular.copy(postData);
                },
                statusLabel: () => {
                    return window.angular.copy(label);
                }

            }
        });
    }



    plainPostUpdateModal(postData, total) {
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'plainPostUpdateModal',
            resolve: {
                postData: () => {
                    return window.angular.copy(postData);
                },
                total: () => {
                    return window.angular.copy(total);
                }
            }
        });
    }
    /*
     internal: ()=>{
     return internal;
     }
     */

}


PostUpdateService.$inject = PostUpdateServiceInjectables;