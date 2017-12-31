let PostDisplayServiceInjectables = ['ListorDataFactory', '$q', '$uibModal', "$http", "store", "$rootScope"];

export class PostDisplayService {
    constructor(ListorDataFactory, $q, $uibModal, $http, store, $rootScope){
        'ngInject';
        this._ListorDataFactory = ListorDataFactory;
        this._$uibModal = $uibModal;
        this._$q = $q;
        this._store = store;
        this._$rootScope = $rootScope;
    }

    addPlainPost(status, data){
        //console.log("STATUS:", status, "DATA:", data);
        data['status'] = status;
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

    updateStatusArrays(statuses){
        let id = this._store.get('userID');
        let data = {update: statuses};
        this._ListorDataFactory.updateStatusArrays(id, data).then((response) => {
            console.log(response);
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

    deletePost(data){
       return this._ListorDataFactory.removePosting(data._id)
            .then((response) =>{
                console.log('delete post response', response);
                this._$rootScope.$emit('updateStatues');
                return response;
            })
            .catch((error) =>{
                console.log('delete post response ERROR', error);
            })
    }

    updatePostTaskList(postId, taskArray){
        this._ListorDataFactory.updatePostTaskList(null, postId, taskArray).then((response) => {
            console.log(response);
        })
        // /updatePostTaskList/:userId/:postId
    }


    // ================= Modals =================================

    addPlainPostModal(status) {
            console.log(status);
            return this._$uibModal.open({
                animation: true,
                size: 'md',
               // backdrop: 'static',
                component: 'addPlainPostModal',
                resolve: {
                    status: () => {
                        return status;
                    }
                }
            });
    }

    addPostModal(statusList, plain) {
        console.log(statusList);
        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'addPostModal',
            resolve: {
                statusList: () => {
                    return statusList;
                },
                plain: () => {
                    return plain;
                }
            }
        });
    }

    viewPostDetailsModal(postData, status, total) {

        return this._$uibModal.open({
            animation: true,
            size: 'md',
            // backdrop: 'static',
            component: 'viewPostDetailsModal',
            windowClass: 'modal-window-class',

            resolve: {
                postData: () => {
                    return window.angular.copy(postData);
                },
                status: () => {
                    return window.angular.copy(status);
                },
                total: () => {
                    return window.angular.copy(total);
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

    statusLabelChangeModal(postData, label) {

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



}

PostDisplayService.$inject = PostDisplayServiceInjectables;