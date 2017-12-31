let EditorDataFactoryInjectables = ['host', 'endPoints', '$http', '$location', '$q', 'CreatorDataFactory', 'ListorDataFactory', 'UtilFactory'];

export class EditorDataFactory {
    constructor(host, endPoints, $http, $location, $q, CreatorDataFactory, ListorDataFactory, UtilFactory) {
        'ngInject';
        this.host = host.host;
        this.routes = endPoints;
        this.$http = $http;
        this.$location = $location;
        this.$q = $q;
        this.CreatorDataFactory = CreatorDataFactory;
        this.ListorDataFactory = ListorDataFactory;
        this.UtilFactory = UtilFactory;
    }

    // Private [called internally by copy]

    /**
     *
     * @param {string} postIdArg
     */
    getOnePostCheck(postIdArg) {
        let postId = postIdArg ? postIdArg : this.$location.search().post;
        return this.$http.get(this.host() + this.routes.listor.checkOnePost + postId);
    }

    // Private [called internally by copy]

    /**
     *
     * @param {string} id
     * @param {object} data
     */
    update(id, data) {
        return this.$http.post(this.host() + this.routes.posting.update + id, data)
            .then((response) => {
                return response.data.data;
            })
            .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
    }

    /**
     *
     * @param {string} postId
     * @param {string} resId
     */
    copy(postId, resId) {
        return this.getOnePostCheck(postId)
            .then((response) => {
                if (response.data.data.resume_ref.length > 2) {
                    return this.removePostingRes(postId, response.data.data.resume_ref)
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
                                        .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
                                })
                                .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
                        })
                        .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
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
                                .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
                        })
                        .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
                }
            });
    }

    //todo need to set up using posting ID as the reference key used in the url.

    /**
     *
     * @param {string} ID
     * @param {boolean} initial
     */
    getData(ID, initial) {
        let locResId = this.$location.search();
        let resId = locResId.res ? locResId.res : ID;
        if (!resId) return;
        return this.$http.get(this.host() + this.routes.creator.retrieve + resId)
            .then((response) => {
                return response.data;
            })
            .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
    }


    getInitImageData(postId) {
        return this.getOnePost(postId)
            .then((response) => {
                return response.data.data.image;
            })
            .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
    }

    /**
     *
     * @param {string} postId
     */
    getInitResData(postId) {
        return this.getOnePost(postId)
            .then((response) => {
                if (response.data.data.resume_ref) {
                    return this.CreatorDataFactory.getData(response.data.data.resume_ref, true)
                        .then((response) => {
                           // return response.data[0]; //<-- this was causing the error all along it seems .....ahhhhhh
                            return response;
                        })
                        .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
                } else {
                    return this.$q((resolve, reject) => {
                        resolve(false);
                    })
                }
            })
    }

    /**
     *
     * @param {string} postId
     */
    getInitTemplateData(postId) {
        return this.getOnePost(postId)
            .then((response) => {
                if (response.data.data.template_ref) {

                    return this.CreatorDataFactory.getTemplateDetails(response.data.data.template_ref)
                        .then((response) => {
                            this.CreatorDataFactory.templateDetails = response.data;
                            return response.data;
                        })
                        .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
                } else {
                    return this.$q((resolve, reject) => {
                        resolve(false);
                    })
                }
            });
    }

    /**
     *
     * @param {string} postIdArg
     */
    getOnePost(postIdArg) {
        let postId = postIdArg ? postIdArg : this.$location.search().post;
        return this.$http.get(this.host() + this.routes.listor.retrieveOnePost + postId);
    }



    /**
     *
     * @param {string} postId
     * @param {string} resId
     */
    removePostingRes(postId, resId) {
        return this.$http.delete(this.host() + this.routes.listor.removeRes + resId + '/' + postId)
            .then((response) => {
                return response.data.data;
            })
            .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
    }


    retreiveMasterRes() {
        return this.CreatorDataFactory.retreiveMasterRes()
            .then((response) => {
                return response;
            })
            .catch((err)=>{console.log(err); this.UtilFactory.httpError(err)});
    }

    /**
     *
     * @param {string} id
     * @param data
     */
    updatePost(id, data) {
        return this.ListorDataFactory.update(id, data);
    }


    base64Convert(rawData, contentType) {
        return this.base64ArrayBuffer(rawData)
            .then((response) => {
                return "data:" + contentType + ";base64," + response;
            })
    }


    base64ArrayBuffer(arrayBuffer) {
        return this.$q((resolve, reject) => {
            try {
                let base64 = '';
                let encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

                let bytes = new Uint8Array(arrayBuffer);
                let byteLength = bytes.byteLength;
                let byteRemainder = byteLength % 3;
                let mainLength = byteLength - byteRemainder;

                let a, b, c, d;
                let chunk;

                // Main loop deals with bytes in chunks of 3
                for (let i = 0; i < mainLength; i = i + 3) {
                    // Combine the three bytes into a single integer
                    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

                    // Use bitmasks to extract 6-bit segments from the triplet
                    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
                    b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
                    c = (chunk & 4032) >> 6;// 4032     = (2^6 - 1) << 6
                    d = chunk & 63;              // 63       = 2^6 - 1

                    // Convert the raw binary segments to the appropriate ASCII encoding
                    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
                }

                // Deal with the remaining bytes and padding
                if (byteRemainder == 1) {
                    chunk = bytes[mainLength];

                    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

                    // Set the 4 least significant bits to zero
                    b = (chunk & 3) << 4; // 3   = 2^2 - 1

                    base64 += encodings[a] + encodings[b] + '=='
                } else if (byteRemainder == 2) {
                    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

                    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
                    b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

                    // Set the 2 least significant bits to zero
                    c = (chunk & 15) << 2; // 15    = 2^4 - 1

                    base64 += encodings[a] + encodings[b] + encodings[c] + '='
                }

                resolve(base64);
            }
            catch (error) {
                this.UtilFactory.jsError(error);
            }
        })

    }

}


EditorDataFactory.$inject =  EditorDataFactoryInjectables;