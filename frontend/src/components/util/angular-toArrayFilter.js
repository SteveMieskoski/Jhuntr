export const toArrayFilter = angular
    .module('angular-toArrayFilter', [])

    .filter('toArray', function () {
        return function (obj, addKey) {
            if (!window.angular.isObject(obj)) return obj;
            if (addKey === false) {
                return Object.keys(obj).map(function (key) {
                    return obj[key];
                });
            } else {
                return Object.keys(obj).map(function (key) {
                    var value = obj[key];
                    return window.angular.isObject(value) ?
                        Object.defineProperty(value, '$key', {enumerable: false, value: key}) :
                        {$key: key, $value: value};
                });
            }
        };
    })
    .name;
