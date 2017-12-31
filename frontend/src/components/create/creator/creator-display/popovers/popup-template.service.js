/*
import basicIconSelect from './templates/basicIconSelect.html';
import dateIconSelect from './templates/dateIconSelect.html';
import detailPopover from './templates/detailPopover.html';
import itemOptionsPopover from './templates/itemOptionsPopover.html';
import locationIconSelect from './templates/locationIconSelect.html';
import sectionPopoverCustom from './templates/sectionPopoverCustom.html';
import skillLevelPopover from './templates/skillLevelPopover.html';


let PopupTemplateServiceInjectables = ['$templateCache'];

export class PopupTemplateService{
    constructor($templateCache){
        this.$templateCache = $templateCache;
    }

    cachePopupTemplates(){
        let PopupTemplates = [
            {name: 'basicIconSelect ', template: basicIconSelect },
            {name: 'dateIconSelect', template: dateIconSelect},
            {name: 'detailPopover', template: detailPopover},
            {name: 'itemOptionsPopover', template: itemOptionsPopover},
            {name: 'locationIconSelect', template: locationIconSelect},
            {name: 'sectionPopoverCustom', template: sectionPopoverCustom},
            {name: 'skillLevelPopover', template: skillLevelPopover}
        ]

        for (let i = 0; i < PopupTemplates.length; i++) {
            this.$templateCache.put(PopupTemplates[i].name + '.html', PopupTemplates[i].template);
        }
    }




}

PopupTemplateService.$inject = PopupTemplateServiceInjectables;

    */