let CreatorUpdateFactoryInjectables = ['CreatorDataFactory', '$rootScope', 'dataTemplate'];

export class CreatorUpdateFactory {

	constructor(CreatorDataFactory, $rootScope, dataTemplate) {
		'ngInject';
		this.CreatorDataFactory = CreatorDataFactory;
		this.$rootScope = $rootScope;
		this.dataTemplate = dataTemplate;
	};


	// Note: saveID -> database ObjectID for res.
    /**
	 *
     * @param templateData - entire data object describing the active res
     * @param section - string identifying the section to add
     */
	removeSection(templateData, section) {
		console.log(templateData);
		let i;
		let re;
		let sectionMatches;

		for (i = 0; i < templateData.design.inner_templates.left.length; i++) {
			re = new RegExp(section);
			sectionMatches = re.exec(templateData.design.inner_templates.left[i].section);
			if (sectionMatches) {
				templateData.design.inner_templates.left.splice(i, 1);
				return this.CreatorDataFactory.updateSectionListing(templateData.design, templateData._id).then( () => {
					return templateData;
				});
			}
		}
		for (i = 0; i < templateData.design.inner_templates.right.length; i++) {
			re = new RegExp(section);
			sectionMatches = re.exec(templateData.design.inner_templates.right[i].section);
			if (sectionMatches) {
				templateData.design.inner_templates.right.splice(i, 1);
				return this.CreatorDataFactory.updateSectionListing(templateData.design, templateData._id).then( () => {
					return templateData;
				});
			}
		}
	}


    /**
	 *
     * @param {object} existingData - entire data object describing the active res
     * @param {string} section - string identifying the section to add
	 * @returns {object}  returns entire updated  data object
     */
	addSections(existingData, section) {
		existingData.design.inner_templates.left.push({section: section});
		return this.CreatorDataFactory.updateSectionListing(existingData.design, existingData._id).then( () => {
			return this.CreatorDataFactory.sectionCreate(section, existingData._id).then( (response) => {
				if (response.data.data) {
					existingData[section] = [response.data.data];
					this.$rootScope.$emit('displayUpdate', existingData);
                    console.log('CreatorUpdateService Add Section 1 ', response);
					return existingData;
				} else {
                    console.log('CreatorUpdateService Add Section 2 ', response);
					this.$rootScope.$emit('displayUpdate', existingData);
					return existingData;
				}
			});
		})
	}


    /**
	 *
     * @param templatesData - entire data object describing the active res
     * @returns {object}  - design section data object describing the active res
     */
	designData(templatesData) {
		if (templatesData) {
			if (templatesData.design == undefined) {
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
		if (isUndefined) {
			designData = window.angular.copy(dataTemplate['design']);  //todo change handline?
			this.CreatorDataFactory.updateSectionListing(designData);
			return designData;
		} else {
			let designDataAll = window.angular.copy(dataTemplate['design']);
			designData.inner_templates = designDataAll.inner_templates;
			this.CreatorDataFactory.updateSectionListing(designData);
			return designData;
		}
	}

	

	removeDetailNoDBCall(data, sectionID, section, detailIndex, saveId) {

	}


    /**
	 *
     * @param {string} section
     * @param {string} saveId
     */
	addRecord(section, saveId) {
		console.log('CreatorDataFactory.addData Call CreatorUpdateService');
		return this.CreatorDataFactory.addData(section, saveId).then( (response) => {
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
		return this.CreatorDataFactory.removeData(section, data, saveId).then( (response) => {
			this.$rootScope.$emit('recordItemChange');
			return response;
		})
	}


    /**
	 *
     * @param {object} existingData
     * @param {string} primary
     * @param {string} secondary
     */
	changeColors(existingData, primary, secondary) {
		existingData.design.style_options.primary_color = primary;
		existingData.design.style_options.secondary_color = secondary;
		return this.CreatorDataFactory.updateSectionListing(existingData.design, existingData._id).then( (response) => {
			this.$rootScope.$emit('displayUpdate', existingData);
			return response.style_options.secondary_color;
		})
	}


    /**
	 *
     * @param {object} existingData
     * @param {string} heading
     * @param {string} subHeading
     * @param {string} body
     */
	changeFonts(existingData, heading, subHeading, body) {
		existingData.design.style_options.heading_font = heading;
		existingData.design.style_options.sub_heading_font = subHeading;
		existingData.design.style_options.body_font = body;
		return this.CreatorDataFactory.updateSectionListing(existingData.design, existingData._id).then( (response) => {
			this.$rootScope.$emit('displayUpdate', existingData);
			return {
				heading: response.style_options.heading_font,
				subHeading: response.style_options.sub_heading_font,
				body: response.style_options.body_font
			};
		})
	}


    /**
	 *
     * @param {object} existingData
     * @param {string} background
     */
	changeBackground(existingData, background) {
		existingData.design.style_options.background = background.file;
		existingData.design.style_options.background_name = background.name;
		existingData.design.style_options.background_display = background.background_display;
		return this.CreatorDataFactory.updateSectionListing(existingData.design, existingData._id).then( (response) => {
			this.$rootScope.$emit('displayUpdate', existingData);
			return response.style_options.background_display;
		})
	}


    /**
	 *
     * @param {string} existingData
     * @param {boolean} state
     */
	showHideImage(existingData, state) {
		existingData.design.style_options.img_show = state;
		return this.CreatorDataFactory.updateSectionListing(existingData.design, existingData._id).then( (response) => {
			return state;
		})
	}
}


CreatorUpdateFactory.$inject = CreatorUpdateFactoryInjectables;