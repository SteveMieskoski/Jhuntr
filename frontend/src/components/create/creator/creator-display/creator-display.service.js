import mrDefaulto from '../../../../assets/images/mrDefulto.png';

let CreatorDisplayServiceInjectables = ['$q', '$rootScope', 'CreatorDataFactory', 'dataTemplate'];

export class CreatorDisplayService {
    constructor($q, $rootScope, CreatorDataFactory, dataTemplate){
        'ngInject';
        this._$q = $q;
        this._CreatorDataFactory = CreatorDataFactory;
        this._$rootScope = $rootScope;
        this.dataTemplate = dataTemplate;
    }

    /**
     *
     * @param templatesData - entire data object describing the active res
     * @returns {object}  - design section data object describing the active res
     */
    designData(templatesData) {
        if (templatesData) {
            if (templatesData.design === undefined) {
                return this.populateColumns(templatesData.design, true);
            } else if (templatesData.design.inner_templates.left.length < 1) {
                // this may break with absolutely new item
                return this.populateColumns(templatesData.design, false);
            } else {
                return templatesData.design;
            }
        }
    }

    /**
     *
     * @param {object} designData
     * @param {boolean} isUndefined
     * @returns {*}
     */
    populateColumns(designData, isUndefined) {
        console.log('populateColumns Var: isUnefined: ', isUndefined);
        if (isUndefined) {
            designData = window.angular.copy(this.dataTemplate['design']);  //todo change handline?
            this._CreatorDataFactory.updateSectionListing(designData);
            return designData;
        } else {
            let designDataAll = window.angular.copy(this.dataTemplate['design']);
            designData.inner_templates = designDataAll.inner_templates;
            this._CreatorDataFactory.updateSectionListing(designData);
            return designData;
        }
    }

    /**
     *
     * @param {string} section
     * @param {string} saveId
     */
    addRecord(section, saveId) {
        return this._CreatorDataFactory.addData(section, saveId).then( (response) => {
            console.log('addRecord response', response);
            return response.data.data;
        })
    }

    /**
     *
     * @param {string} section
     * @param {object} data
     * @param {string} saveId
     */
    removeRecord(section, data, saveId) {
        return this._CreatorDataFactory.removeData(section, data, saveId).then( (response) => {
            this._$rootScope.$emit('recordItemChange');
            return response;
        })
    }

    /**
     *
     * @param templateData - entire data object describing the active res
     * @param section - string identifying the section to add
     */
    removeSection(templateData, section) {
        let i;
        let re;
        let sectionMatches;

        for (i = 0; i < templateData.design.inner_templates.left.length; i++) {
            re = new RegExp(section);
            sectionMatches = re.exec(templateData.design.inner_templates.left[i].section);
            if (sectionMatches) {
                templateData.design.inner_templates.left.splice(i, 1);
                return this._CreatorDataFactory.updateSectionListing(templateData.design, templateData._id).then( () => {
                    return templateData;
                });
            }
        }
        for (i = 0; i < templateData.design.inner_templates.right.length; i++) {
            re = new RegExp(section);
            sectionMatches = re.exec(templateData.design.inner_templates.right[i].section);
            if (sectionMatches) {
                templateData.design.inner_templates.right.splice(i, 1);
                return this._CreatorDataFactory.updateSectionListing(templateData.design, templateData._id).then( () => {
                    return templateData;
                });
            }
        }
    }

    /**
     *
     * @param {string} type
     * @param {string} selected
     * @param {string} section
     * @param templateData
     * @param index
     * @returns {*}
     */
    iconSelected(type, selected, section, templateData, index) {
        return this._$q((resolve, reject) => {
            switch (type) {
                case 'basic':
                    this.closeBasicPopover = {};
                    templateData.basics[0][index] = selected;
                    resolve({templateData: templateData, closeBasicPopover: true});
                    break;
                case 'date':
                    this.closeBasicPopover = {};
                    templateData.design.style_options.calendar_icon = selected;
                    resolve({templateData: templateData, closeBasicPopover: true});
                    break;
                case 'map':
                    this.closeBasicPopover = {};
                    templateData.design.style_options.location_icon = selected;
                    resolve({templateData: templateData, closeBasicPopover: true});
                    break;
                case 'none':
                    templateData[section][index].icon_show = false;
                    resolve({templateData: templateData, closeBasicPopover: false});
                    break;
                default:
                    templateData[section][index].icon = selected;
                    resolve({templateData: templateData, closeBasicPopover: false});
                    break;
            }
        })
    }

    /**
     *
     * @param {object} templateData
     * @returns {*}
     */
    checkImagePresent(templateData) {
        return this._$q((resolve, reject) => {
            if (templateData.attachments) {
                if (templateData.attachments.img_data) {
                    resolve(this.base64Convert(templateData.attachments.img_data.data, templateData.attachments.img_contentType));
                } else {
                    //resolve('src/assets/mrDefulto.png');
                    resolve(mrDefaulto)
                }
            } else {
                resolve(mrDefaulto);
               // resolve('assets/mrDefulto.png');
            }
        })
    }

    /**
     *
     * @param {Uint8Array} rawData
     * @param {string} contentType
     */
    base64Convert(rawData, contentType) {
        return this.base64ArrayBuffer(rawData).then((response) => {
            return "data:" + contentType + ";base64," + response;
        })
    }

    /**
     *
     * @param {Uint8Array} arrayBuffer
     * @returns {*}
     */
    base64ArrayBuffer(arrayBuffer) {
        return this._$q((resolve, reject) => {
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

            //return base64
            resolve(base64);
        })

    }
}

CreatorDisplayService.$inject = CreatorDisplayServiceInjectables;