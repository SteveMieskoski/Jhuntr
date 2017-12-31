let UserHomeServiceInjectables = ['ListorDataFactory', '$q', '$uibModal', "$http"];

export class UserHomeService {
    constructor(ListorDataFactory, $q, $uibModal, $http){
        'ngInject';
        this._ListorDataFactory = ListorDataFactory;
        this._$uibModal = $uibModal;
        this._$q = $q;
      //  this._$http = $http;
    }
/*
    addPlainPost(status, data){
        //console.log("STATUS:", status, "DATA:", data);
        return this._ListorDataFactory.addPlainPost(null, data, status).then((response) => {
              console.log(response);
            return response;
           })
    }

    getStatuses(){
      return  this._ListorDataFactory.getStatuses().then((response) => {
            return response;
        })
    }

    updateStatusArrays(id, statuses){
        this._ListorDataFactory.updateStatusArrays(id, statuses).then((response) => {
            console.log(response);
        })
    }

    addPlainPostModal(status) {

            return this._$uibModal.open({
                animation: true,
                size: 'md',
               // backdrop: 'static',
                component: 'addPlainPost',
                resolve: {
                    status: () => {
                        return status;
                    }
                }
            });
    }

    viewPostDetailsModal(postData) {

        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'viewPostDetails',
            resolve: {
                postData: () => {
                    return window.angular.copy(postData);
                }
            }
        });
    }


    plainPostUpdateModal(postData) {

        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'plainPostUpdate',
            resolve: {
                postData: () => {
                    return window.angular.copy(postData);
                }
            }
        });
    }

    plainPostFileUploadModal(postData) {
        console.log('user home service file upload modal launcher');
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'userFileUpload',
            resolve: {
                postData: () => {
                    return window.angular.copy(postData);
                }
            }
        });
    }

    updatePostTaskList(postId, taskArray){
        this._ListorDataFactory.updatePostTaskList(null, postId, taskArray).then((response) => {
            console.log(response);
        })
        // /updatePostTaskList/:userId/:postId
    }
*/
}

UserHomeService.$inject = UserHomeServiceInjectables;