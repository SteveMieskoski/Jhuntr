let EditorControllerInjectables = ['$rootScope', '$timeout', '$location', 'EditorDataFactory', 'CreatorDataFactory', '$animate', '$interval'];

export default class EditorController {
    constructor($rootScope, $timeout, $location, EditorDataFactory, CreatorDataFactory, $animate, $interval) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.$location = $location;
        this.EditorDataFactory = EditorDataFactory;
        this.CreatorDataFactory = CreatorDataFactory;
        this.$animate = $animate;
        this.$interval = $interval;


        this.viewSlider = false;
        this.moveSlider = false;
        this.popupTemplates = 'src/components/creator/creator-display/popovers/popup.template.html';
        this.itemPopupTemplates = 'src/components/creator/creator-display/popovers/section-item.template.html';

        this.sliderSlideUnbind = this.$rootScope.$on('sliderSlideIn', (evt, data) => {
            this.sliderOperation(data);
        });
    }


    $onInit() {
        this.$animate.enabled(true);
        this.initial = true;
        this.viewingPost = this.$location.search().post;
        this.initContentData = this.initData;
        this.postData = this.postContent.data;
        //this.cropPosting = true;
		this.intervalCount = 0;
		console.log(this.postContent);
        console.log(this.postData);
      //  this.$rootScope.$emit('editorRightLoadImage');
        window.angular.element(this.pageLoadComplete());
    };

    $onDestroy() {
        this.sliderSlideUnbind();
    }

    pageLoadComplete(){
        this.$timeout(() =>{
            this.$rootScope.$emit('navigationPageLoaded', 'EditorController');
        }, 500)
    }


    /**
     *
     * @param {string} section
     */
    sliderOperation(section) {
        if (this.viewSlider && section && this.sliderDisplaySection !== section) {
            this.sliderDisplaySection = section;
          if(this.viewSlider)  return;
        };
        if (section) this.sliderDisplaySection = section;

      //    this.moveSlider = !this.moveSlider;
        if (this.viewSlider) {
            this.moveSlider = !this.moveSlider;
            this.$timeout(() => {
                this.viewSlider = !this.viewSlider;
               // this.moveSlider = false;
            }, 900);
        } else {
            if (!this.moveSlider) {
                this.moveSlider = !this.moveSlider;
                this.$timeout(() => {
              //      this.moveSlider = !this.moveSlider;
                }, 200);
            }
            this.viewSlider = !this.viewSlider;
        }
    }

   // showCrop(value) {
   //     this.cropPosting = !this.cropPosting;
   // }

    /**
     *
     * @param {promise} promiseReturn
     * @param {object} data
     */
    saveData(promiseReturn, data) {
        if (promiseReturn) {
            return this.CreatorDataFactory.saveData(data, data._id).then((response) => {
                this.$rootScope.$emit('unsavedChanges', false);
                return response;
            })
        } else {
            this.CreatorDataFactory.saveData(data, data._id).then((response) => {
                this.$rootScope.$emit('unsavedChanges', false);
                return response;
            })
        }
    }
}


EditorController.$inject = EditorControllerInjectables;