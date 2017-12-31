/**
 *  container that diplays/displayed the details-edit templates
 */

export default class InputOptionsController {
    constructor() {
        'ngInject';
        this.active = 0;
    }

    saveData() {
        this.creator.saveData();
    }
}