let StyleEditingServiceInjectables = ['CreatorDataFactory', '$rootScope', 'dataTemplate', 'styleBackgroundsConstants','styleColorsConstants','styleFontsConstants','styleSectionsConstants'];

export class StyleEditingService {

    constructor(CreatorDataFactory, $rootScope, dataTemplate, styleBackgroundsConstants, styleColorsConstants, styleFontsConstants, styleSectionsConstants) {
        'ngInject';
        this.CreatorDataFactory = CreatorDataFactory;
        this.$rootScope = $rootScope;
        this.dataTemplate = dataTemplate;
        this.sectionConstants = {
            background: styleBackgroundsConstants,
            colors: styleColorsConstants,
            fonts: styleFontsConstants,
            sections: styleSectionsConstants
        }
    };

    selectionConstants(selection){
        return this.sectionConstants[selection];
    }

    /**
     *
     * @param {boolean} value
     */
    dirtyValue(value) {
        this.$rootScope.$emit('unsavedChanges', value);
    };

    /**
     *
     * @param {object} data - updated res data
     */
    updateDisplay(data) {
        this.$rootScope.$emit('displayUpdate', data);
    };

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
                    this.dirtyValue(true);
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
                    this.dirtyValue(true);
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
        return this.CreatorDataFactory.updateSectionListing({design: existingData.design}, existingData._id).then( () => {
            this.updateDisplay(existingData);
            this.dirtyValue(true);
          /*  return this.CreatorDataFactory.sectionCreate(section, existingData._id).then( (response) => {
                    console.log(response);
                if (response.data.data) {
                    if(Array.isArray(response.data.data)){
                        existingData[section] = response.data.data;
                    } else {
                        existingData[section] = [response.data.data];
                    }
                    this.updateDisplay(existingData);
                    this.dirtyValue(true);
                    return existingData;
                } else {
                    this.updateDisplay(existingData);
                    return existingData;
                }
            })
                .catch((error) => {console.log('add sections error', error)}); */
        })
    }

    sectionExpand(existingData, section) {
       // existingData.design.inner_templates.left.push({section: section});
      //  return this.CreatorDataFactory.updateSectionListing({design: existingData.design}, existingData._id).then( () => {
            return this.CreatorDataFactory.sectionCreate(section, existingData._id).then( (response) => {
                    console.log(response);
                    if (response.data.data) {
                        if(Array.isArray(response.data.data)){
                            existingData[section] = response.data.data;
                        } else {
                            existingData[section] = [response.data.data];
                        }
                        this.updateDisplay(existingData);
                        this.dirtyValue(true);
                        return existingData;
                    } else {
                        this.updateDisplay(existingData);
                        return existingData;
                    }
                })
                .catch((error) => {console.log('add sections error', error)});
      //  })
    }

    /**
     *
     * @param {object} existingData - entire data object describing the active res
     * @returns {styleSectionsConstants.allSectionsDefault|{achievements, languages, projects, interests, employment, education, skills, volunteer, strengths, courses, summary, technologies}|*}
     */
    availableSections(existingData) {
        let i;
        let sectionMatches;

        sectionMatches = window.angular.copy(this.sectionConstants.sections.allSectionsDefault);
        if (existingData.design.inner_templates.left.length >= 1 || existingData.design.inner_templates.right.length > 1) {
            for (let prop in sectionMatches) {
                sectionMatches[prop] = true;
            }
            for (i = 0; i < existingData.design.inner_templates.left.length; i++) {
                sectionMatches[existingData.design.inner_templates.left[i].section] = false;
            }
            for (i = 0; i < existingData.design.inner_templates.right.length; i++) {
                sectionMatches[existingData.design.inner_templates.right[i].section] = false;
            }
            return sectionMatches;
        } else {
            return sectionMatches;
        }
    };

    changeColors(existingData, primary, secondary) {
        existingData.design.style_options.primary_color = primary;
        existingData.design.style_options.secondary_color = secondary;
        return this.CreatorDataFactory.updateSectionListing({design: existingData.design}, existingData._id).then( (response) => {
            this.updateDisplay(existingData);
            console.log(response);
            this.dirtyValue(true);
            return response.data.data.style_options.secondary_color;
        })
    }



    changeFonts(existingData, heading, subHeading, body) {
        existingData.design.style_options.heading_font = heading;
        existingData.design.style_options.sub_heading_font = subHeading;
        existingData.design.style_options.body_font = body;
        return this.CreatorDataFactory.updateSectionListing({design: existingData.design}, existingData._id).then( (response) => {
            this.updateDisplay(existingData);
            console.log(response);
            return {
                heading: response.data.data.style_options.heading_font,
                subHeading: response.data.data.style_options.sub_heading_font,
                body: response.data.data.style_options.body_font
            };
        })
    }



    changeBackground(existingData, background) {
        existingData.design.style_options.background = background.file;
        existingData.design.style_options.background_name = background.name;
        existingData.design.style_options.background_display = background.background_display;
        return this.CreatorDataFactory.updateSectionListing({design: existingData.design}, existingData._id).then( (response) => {
            this.updateDisplay(existingData);
            console.log(response);
            return response.data.data.style_options.background_display;
        })
    }
}

StyleEditingService.$inject = StyleEditingServiceInjectables;