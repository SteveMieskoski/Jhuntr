//import sweetAlert from '../../../../node_modules/sweetalert/dist/sweetalert-dev.js';
let CreateListControllerInjectables = ['host', '$rootScope', 'CreatorDataFactory', '$timeout', '$q', '$window', 'store'];

export default class CreateListController {
    constructor(host, $rootScope, CreatorDataFactory, $timeout, $q, $window, store) {
        'ngInject';
        this.host = host;
        this.$rootScope = $rootScope;
        this.CreatorDataFactory = CreatorDataFactory;
        this.$timeout = $timeout;
        this._$q = $q;
        this.$window = $window;
        this.store = store;
        // this.sweetAlert = sweetAlert;
    }


    $onInit() {
        this.editLabel = [];
        this.editing = null;
        this.resRemoved = false;
        this.showAddPlaceholder = false;
        this.showAddOtherSource = false;
        window.angular.element(this.pageLoadComplete())

    };

    pageLoadComplete() {
        this.$timeout(() => {
            this.$rootScope.$emit('navigationPageLoaded', 'CreateListController');
        }, 750);
    };

    parseResumeView(item) {
        if (item._kind !== "CoreResume") {
            return false;
        } else {
            return true;
        }
    }

    parseResumeType(item, kind) {
        let check = item ? item._kind : kind;
        switch (check) {
            case 'DropBoxRefResume':
                return 'Dropbox' + ' File';
                break;
            case 'DriveRefResume':
                return 'Google Drive' + ' File';
                break;
            case 'PlaceholderResume':
                return 'Placeholder';
                break;
            case 'OtherSourceResume':
                if(item.hasOwnProperty('otherSource')){
                    return item.otherSource;
                } else {
                    return 'Unknown Source';
                }
                break;
            default:
                break;
        }
    }

    addLabelOnly(label, action) {
        if(action){
            console.log('placeholder label:', label, action);
          let data = {ref_label: label};
            this.CreatorDataFactory.createNewAltRes('placeholder', data)
                .then((response) => {
                    console.log(response);
                    this.resumeList.push(response.data.data);
                    this.showAddPlaceholder = false;
                })
                .catch((error) =>{

                })
        } else {
            this.showAddPlaceholder = false;
        }
    }

    addOtherSource(respData, action){
        if(action){
            console.log('placeholder label:', respData, action);
            let data = {ref_label: respData.label, otherSource: respData.source};
            this.CreatorDataFactory.createNewAltRes('otherSource', data)
                .then((response) => {
                    console.log(response);
                    this.resumeList.push(response.data.data);
                    this.showAddOtherSource = false;
                })
                .catch((error) =>{

                })
        } else {
            this.showAddOtherSource = false;
        }
    }


    editResponse(resId, data, action){
        switch(action){
            case 'update':
                console.log('update');
                console.log(resId, data.label);
                this.changeResName(resId, data.label, data.index);
                break;
            case 'cancel':
                console.log('cancel');
                this.editing = null;
                break;
            case 'delete':
                console.log('delete');
                console.log(resId, data);
                this.removeRes(resId, data);
                this.editing = null;
                break;
            default:
                break;
        }
        console.log(data);
    }

    parseAltLabel(item) {
        return this.parseResumeType(item) ;
    }

    createNewRes() {
        this.CreatorDataFactory.createNewRes()
            .then((response) => {
                this.CreatorDataFactory.getResList()
                    .then((response) => {
                        this.resumeList = response;
                        this.editing = null;
                      /*  for (let i = 0; i < response.length; i++) {
                            // todo: use a better setup (look at that used in the post-display module for editing task labels
                            this.editLabel[i] = {state: false, value: window.angular.copy(this.resumeList.ref_label)};
                        }*/
                    })
            });
    }

    /**
     *
     * @param {boolean} done
     */
    allowEdit(done) {
        this.editLabel = !done;
    }

    /**
     *
     * @param {string} resId
     * @param {string} newLabel
     * @param {number} index of display for edited item
     */
    changeResName(resId, newLabel, index) {
        this.CreatorDataFactory.updateResLabel(resId, newLabel)
            .then(() => {
                this.resumeList[index].ref_label = newLabel;
                this.editing = null;
            })
            .catch((error) => {
                console.log(error);
                this.editing = null;
            })
    }

    /**
     *
     * @param {string} message
     */
    confirm(message) {
        //  this.sweetAlert("Here's a message!");
        let defer = this._$q.defer();
        // The native confirm will return a boolean.
        if (this.$window.confirm(message)) {
            defer.resolve(true);
        } else {
            defer.reject(false);
        }
        return ( defer.promise );
    }

    /**
     *
     * @param {string} id - objectId of res to delete/remove
     */
    removeRes(id, kind) {
        // Define promise-based confirm() method.
        let canRemove = ["CoreResume", 'PlaceholderResume', 'OtherSourceResume'];
        if ((canRemove.indexOf(kind) >= 0)) {
            this.confirm('are you sure?').then(() => {
                let userId = this.store.get('userID');
                this.CreatorDataFactory.removeRes(id, userId).then((response) => {
                    for (let i = 0; i < this.resumeList.length; i++) {
                        if (this.resumeList[i]._id == id) {
                            this.resumeList.splice(i, 1);
                        }
                    }
                    return this.resumeList;
                })
            }).catch((err) => {
                console.log('confirm remove res catch', err);
                console.log('ok do nothing');
            })
        } else {
            let type = this.parseResumeType(null, kind);
            this.message = 'Please remove on the ' + type + ' cloud page';
            alert(this.message);
        }

    }

}

CreateListController.$inject = CreateListControllerInjectables;