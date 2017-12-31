let FuzzySearchServiceInjectables = [];

import FuseJs from 'fuse.js';

export class FuzzySearchService{
    constructor(){
    }

    fuzzySearch(query, items, options){
        if (!window.angular.isArray(items)) {
            console.log('list to fuzzySearch not array');
            items = [items];
        }
        if(!options){
            let keys = Object.keys(items[0]);
            options = {keys: keys};
        }
        let fuse = new FuseJs(items, options);

        return fuse.search(query)
    }

    Fuse(list, options){
        if (!window.angular.isArray(list)) {
            console.log('list to fuzzySearch not array', list);
            list = [list];
        }
        if(!options){
            console.log('options to fuzzySearch returns false');
            let keys = Object.keys(list[0]);
            options = {keys: keys};
        }

        return new FuseJs(list, options);
    }

    FuseRecursiveLike(items, options){
        if (!window.angular.isArray(items)) {
            console.log('list to fuzzySearch not array');
            items = [items];
        }
        if(!options){
            console.log('options to fuzzySearch returns false');
            let keys = Object.keys(items[0]);
            options = {keys: keys};
        }
     /*   if(items.every(function(entry){ if(entry.item)})){

        }*/

        return new FuseJs(items, options);
    }
}

FuzzySearchService.$inject = FuzzySearchServiceInjectables;

/*


// BREAKS ANGULAR (i.e. Throws Error: $rootScope:infdig Infinite $digest Loop) Because a new array is returned from
// each call to fuzzy (which occurs during each digest loop) there is a solution, but I'm not sure about implementing it or
// the effort required to or need to implement it.
fuzzy.$inject = [];

export function fuzzy() {
        return function (list, options, query) {
            if (!query && window.angular.isObject(options)){
                return list;
            } else if(!query){
                return list;
            }
            if (!window.angular.isArray(list)) {
                list = [list];
            }
            if (!window.angular.isObject(options) && !window.angular.isArray(options)) {
                let keys = Object.keys(items[0].item);
                options = {keys: keys};
            }
            console.log('fuzzy Filter Query', query);
            let fuse = new FuseJs(list, options);

            return fuse.search(query);
        }
}
*/