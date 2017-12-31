
let CreatorStylesControllerInjectables = ['CreatorFactory', '$rootScope', 'CreatorFeaturesFactory', 'CreatorUpdateFactory', 'featureConstants', '$window', 'UtilFactory', 'StyleService'];

export default class CreatorStylesController{
    constructor(CreatorFactory, $rootScope, CreatorFeaturesFactory, CreatorUpdateFactory, featureConstants, $window, UtilFactory, StyleService){
        'ngInject';
        this.CreatorFactory = CreatorFactory;
        this.$rootScope = $rootScope;
        this.CreatorFeaturesFactory = CreatorFeaturesFactory;
        this.CreatorUpdateFactory =  CreatorUpdateFactory;
        this.featureConstants = featureConstants;
        this.$window = $window;
        this.UtilFactory = UtilFactory;
        this.StyleService = StyleService;


        this.newColorLoading = true;
        this.styleListener = this.$rootScope.$on('styleUpdate',  (event, data) => {
            this.availableSections(data);
        });
    }


    //Life Cycle Events
    $onInit() {
        // this.featureConstants = featureConstants;
        this.availableSections(this.existingData);
        this.defaultFontConfig(true);
        this.existingSelections(true);
		this.featureConstants = this.StyleService.selectionConstants(this.inputSelection);
        if (this.$window.innerWidth < 768) {
            this.collapseInputForm = false;
        }
    };

    $onChanges() {
        this.existingSelections(false);
    };

    $onDestroy() {
        this.styleListener();
    };


    // Component Controller Functions

    existingSelections(initial) {
        this.newColorLoading = false;
           this.colorTwo = window.angular.copy(this.existingData.design.style_options.secondary_color);
         this.headingFont = window.angular.copy(this.existingData.design.style_options.heading_font);
         this.bodyFont = window.angular.copy(this.existingData.design.style_options.body_font);
         this.subHeadingFont = window.angular.copy(this.existingData.design.style_options.sub_heading_font);
         this.background_display = window.angular.copy(this.existingData.design.style_options.background_display);
         this.imageShowState = window.angular.copy(this.existingData.design.style_options.img_show);
        if (initial) {
            this.usedFontNames(this.headingFont, this.subHeadingFont, this.bodyFont);
        }
    }

    usedFontNames(heading, subHeading, body) {
        let fontsArray = this.featureConstants.fontListing;
        for (let i = 0; i < fontsArray.length; i++) {
            if (fontsArray[i].class == heading) {
                this.usedHeadingFont = fontsArray[i].name;
            }
            if (fontsArray[i].class == subHeading) {
                this.usedSubHeadingFont = fontsArray[i].name;
            }
            if (fontsArray[i].class == body) {
                this.usedBodyFont = fontsArray[i].name;
            }
        }
        if (!this.usedHeadingFont) {
            this.defaultFontConfig();
        }
    }

    toggleImageShown(allData, imageState) {
        let existingData = allData ? allData : this.existingData;
        let imageShowState = imageState ? imageState : this.imageShowState;
       // let data = {attachments: {_id: this.existingData.attachments._id, user_photo: this.imageShowState}};
        this.CreatorUpdateFactory.showHideImage(existingData, imageShowState)
            .then( (response) => {
                this.photoShow = imageShowState;
                this.$rootScope.$emit('photoStateChange', imageShowState);
            })
            .catch(this.UtilFactory.httpError);
    }

    fileUploader() {
        this.CreatorFactory.imageUpload();
    }

    availableSections(data) {
        let existingData = data ? data : this.existingData;
        this.allSections = this.StyleService.availableSections(existingData);
    }

    addSections(section) {
        this.allSections[section] = !this.allSections[section];
        this.StyleService.addSections(this.existingData, section)
            .then( (response) => {
                this.StyleService.dirtyValue(true);
            })
            .catch(this.UtilFactory.httpError);
    }

    changeColors(primary, secondary) {
        this.newColorLoading = true;
      //  this.colorsUpdate = !this.colorsUpdate;
        this.StyleService.changeColors(this.existingData, primary, secondary)
            .then( (response) => {
                this.colorTwo = response;
                this.newColorLoading = false;
            })
            .catch(this.UtilFactory.httpError);
    };

    changeFonts(heading, subHeading, body) {
        this.StyleService.changeFonts(this.existingData, heading, subHeading, body)
            .then( (response) => {
                this.headingFont = response.heading;
                this.subHeadingFont = response.subHeading;
                this.bodyFont = response.body;
            })
            .catch(this.UtilFactory.httpError);
    };

    changeBackground(background) {
        this.StyleService.changeBackground(this.existingData, background)
            .then( (response) => {
                this.background_display = response;
            })
            .catch(this.UtilFactory.httpError);
    };

    displayPairingFonts(fontPairing) {
        this.usedHeadingFont = fontPairing.headingName;
        this.usedSubHeadingFont = fontPairing.bodyName;
        this.usedBodyFont = fontPairing.bodyName;
        this.usedParingHeading = fontPairing.headingName + ' / ';
        this.usedParingBody = fontPairing.bodyName;
    }

    defaultFontConfig(initial) {
        if (initial) {
            this.isCollapsedParts = true;
            this.isCollapsedPairings = true;
            this.isCollapsedHeading = true;
            this.isCollapsedSubHeading = true;
            this.isCollapsedBody = true;
        } else {
            this.isCollapsedParts = true;
            this.isCollapsedPairings = true;
            this.isCollapsedHeading = true;
            this.isCollapsedSubHeading = true;
            this.isCollapsedBody = true;
            this.usedHeadingFont = 'Default';
            this.usedSubHeadingFont = 'Default';
            this.usedBodyFont = 'Default';
            this.usedParingHeading = '';
            this.usedParingBody = '';
        }
    }
}

CreatorStylesController.$inject = CreatorStylesControllerInjectables;