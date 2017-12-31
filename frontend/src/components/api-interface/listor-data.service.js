let ListorDataFactoryInjectables = ['host', '$http', 'endPoints', '$q', '$location', 'store', 'UtilFactory', 'ApiUtilities'];

export class ListorDataFactory {
    constructor(host, $http, endPoints, $q, $location, store, UtilFactory, ApiUtilities) {
        'ngInject';
        this.host = host.host;
        this.$http = $http;
        this.routes = endPoints;
        this.$q = $q;
        this.$location = $location;
        this.store = store;
        this.UtilFactory = UtilFactory;
        this.ApiUtilities = ApiUtilities;

        this.listData = {};
    }

    /**
     *
     * @param {object} listData
     */
    setState(listData) {
        let len = this.listData ? this.listData.length : 0;
        while (len--) {
            this.listData[listData[len]._id] = listData[len];
        }
    }

    /**
     *
     * @param {string} postId
     * @returns {*}
     */
    getState(postId) {
        return this.$q((resolve, reject) => {
            if (Object.keys(this.listData).length == 0) {
                this.listPosts()
                    .then((response) => {
                        setState(response);
                        let len = response.length;
                        while (len--) {
                            if (response[len]._id == postId) {
                                resolve(response[len]);
                            }
                        }
                    })
                    .catch(reject('unable to secure state'), (err) => {
                        this.UtilFactory.httpError(err)
                    });
            } else {
                resolve(this.listData[postId]);
            }
        })
    }

    getPost(postId){
        return this.$http.get(this.host() + this.routes.listor.retrieveOnePost + postId)
    }

    /**
     *
     * @param {string} id
     * @param {object} data
     * @param {string} status
     */
    addPlainPost(id, data, status) {
        if (!id) {
            console.log('without id');
            return this.ApiUtilities.getInternalUserId().then((userId) => {
                return this.$http.post(this.host() + this.routes.posting.addPlainPost + userId, data)
                    .then((response) => {
                        console.log(response);
                        return response.data.data;
                    })
            });
        } else {
            return this.$http.post(this.host() + this.routes.posting.addPlainPost + id + '/' + status, data)
                .then((response) => {
                    return response.data.data;
                })
        }
    }

    getStatuses(userId) {
        return this.$q((resolve, reject) => {
            console.log('without id');
            if (userId) {
                resolve(
                    this.$http.get(this.host() + this.routes.posting.getStatuses + userId)
                        .then((response) => {
                            console.log(response);
                            return response.data.data;
                        })
                )

            } else {
                window.setTimeout(() => {
                    resolve(
                        this.ApiUtilities.getNewInternalUserId()
                            .then((userId) => {
                                return this.$http.get(this.host() + this.routes.posting.getStatuses + userId)
                                    .then((response) => {
                                        console.log(response);
                                        return response.data.data;
                                    })
                            })
                    )
                }, 500);

            }
        })
    }

    updateStatusArrays(id, data) {
        console.log('without id');
        return this.$http.post(this.host() + this.routes.posting.updateStatuses, data)
            .then((response) => {
                console.log(response);
                return response.data.data;
            })
    }

    updatePostTaskList(id, postId, taskArray) {
        // /updatePostTaskList/:userId/:postId
        if (!id) {
            console.log('without id');
            //    return this.ApiUtilities.getExternalUserId().then((userId) => {
            return this.$http.post(this.host() + this.routes.posting.updatePostTaskList + postId, {tasks: taskArray})
                .then((response) => {
                    console.log(response);
                    return response.data.data;
                })
            // });
        } else {
            return this.$http.post(this.host() + this.routes.posting.updatePostTaskList + postId, data)
                .then((response) => {
                    return response.data.data;
                })
        }
    }

    /**
     *
     * @param {object} options : key value (value=1) pair of fields to include in return data
     */
    listPosts(options) {
        let userId = this.store.get('userID');
        if (userId) {
            return this.$http.get(this.host() + this.routes.listor.list + userId, {params: options})
                .then((response) => {
                console.log(response);
                    if (response.status === 401) {
                        this.$location.path('/login');
                    }
                    return response.data.data;
                })
                .catch((err) => {
                    this.UtilFactory.httpError(err)
                });
        } else {
            return this.ApiUtilities.getNewInternalUserId()
                .then((response) => {
                    if (options) {
                        var optionQuery = "?";
                        var count = 0;
                        /* for (var prop in options) {
                         if (count === 0) {
                         optionQuery = optionQuery + prop + '=' + options[prop];
                         } else {
                         optionQuery = optionQuery + '&' + prop + '=' + options[prop];
                         }
                         }*/
                        console.log('response + optionQuery', response + optionQuery);
                        return this.$http.get(this.host() + this.routes.listor.list + response, {params: options})
                            .then((response) => {
                                if (response.status === 401) {
                                    this.$location.path('/login');
                                }
                                return response.data.data;
                            })
                            .catch((err) => {
                                this.UtilFactory.httpError(err)
                            });
                    }
                })


        }
    }


    /**
     *
     * @param {String} id
     * @param {object} data
     */
    update(id, data) {

        return this.$http.post(this.host() + this.routes.posting.update + id, data)
            .then((response) => {
                // Object.assign({}, this.listData[id], data);
                return response.data.data;
            })
            .catch((err) => {
                this.UtilFactory.httpError(err)
            });
    }

    /**
     *
     * @param {string} postId
     * @param {string} resId
     */
    removePostingRes(postId, resId) {
        return this.$http.delete(this.host() + this.routes.listor.removeRes + resId + '/' + postId)
            .then((response) => {
                Object.assign({}, this.listData[postId], {resume_ref: '0'});
                return response.data.data;
            })
            .catch((err) => {
                this.UtilFactory.httpError(err)
            });
    }

    /**
     *
     * @param {string} postId
     */
    removePosting(postId) {
        return this.$http.delete(this.ApiUtilities.host() + this.routes.posting.removePosting + postId)
            .then((response) => {
                return response.data.data;
            })
            .catch((err) => {
                this.UtilFactory.httpError(err)
            });
    }

    /**
     *
     * @param {string} postId
     * @param {string} resId
     */
    copyResToPosting(postId, resId) {
        if (this.listData[postId].resume_ref.length > 2) {
            return this.removePostingRes(postId, this.listData[postId].resume_ref)
                .then((response) => {
                    return this.$http.get(this.host() + this.routes.creator.copy + resId)
                        .then((response) => {
                            return this.update(postId, {
                                    resume_ref: response.data.data._id,
                                    template_ref: response.data.data.template_ref
                                })
                                .then((response) => {
                                    return response;
                                })
                        })
                })
                .catch((err) => {
                    this.UtilFactory.httpError(err)
                });
        } else {
            return this.$http.get(this.host() + this.routes.creator.copy + resId)
                .then((response) => {
                    return this.update(postId, {
                            resume_ref: response.data.data._id,
                            template_ref: response.data.data.template_ref
                        })
                        .then((response) => {
                            return response;
                        })
                        .catch((err) => {
                            this.UtilFactory.httpError(err)
                        });
                })
        }

    }
}


ListorDataFactory.$inject = ListorDataFactoryInjectables;