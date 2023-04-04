(function(){
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com');

    // Directive
    function FoundItemsDirective(){
        var ddo = {
            restrict: 'E',
            scope: {
                foundItems: '<',
                emptyMessage: '<',
                onRemove: '&'
            },
            templateUrl: 'NarrowItDown.html',
            controller: NarrowItDownController,
            controllerAs : 'ctrl',
            bindToController: true
        };
        return ddo;
    };

    // Controller
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.message = '';

        ctrl.getMatchedMenuItems = function(searchTerm){
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function(items){
                if(items && items.length > 0 && searchTerm.length > 0){
                    ctrl.found = items;
                }
                else{
                    ctrl.found = [];
                    ctrl.message = 'Nothing found';
                }
            });
        };

        ctrl.removeItem = function(index){
            ctrl.found.splice(index, 1);
        };

    };

    // Service
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath){
        var service = this;

        service.getMatchedMenuItems = function(searchTerm){
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                headers: {
                    'x-content-type-options': 'nosniff',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response){
                var foundItems = [];
                var allFound = [];
                var data = response.data;
                
                var values = [];
                for(var key in data)
                {
                    values.push(data[key]);
                }
                
                var menu = [];  
                for(var i = 0; i < values.length; i++)
                {
                    for(var key in values[i])
                    {
                        menu.push(values[i]['menu_items']);
                    }
                }

                for(var i = 0; i < menu.length; i++)
                {
                    for(var j = 0; j < menu[i].length; j++)
                    {                        
                        allFound.push(menu[i][j]);                        
                    }                    
                }

                for(var i = 0; i < allFound.length; i++)
                {
                    if(allFound[i]['description'].indexOf(searchTerm) !== -1)
                    {
                        foundItems.push(allFound[i]);
                    }
                }
                return foundItems;          
            });
        };
    };
})();