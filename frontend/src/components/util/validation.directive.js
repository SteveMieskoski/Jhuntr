


export function validation () {
    return {
        restrict: 'A',
        require: "?ngModel",
        //scope: {
       //     valid: '='
       // },
        /* ngModel instance passed as forth param to link */
        link: function (scope, el, attrs, ngModel) {
            if (!ngModel) return;
            console.log(ngModel)

        }
    }
};