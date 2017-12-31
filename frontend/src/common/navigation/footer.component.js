import template from './footer.component.html';


export const footerComponent = {
            binding: {
                newPage: '<'
            },
            template,
            controller: class FooterController{
                constructor(){
                    'ngInject';
                }
            }
        };
