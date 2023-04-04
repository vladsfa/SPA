(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http','$q', '$timeout']
    function MenuDataService($http,$q, $timeout) {
        var service = this;
        // var items = [];

        service.getItemsForCategory = function (categoryByShortName) {
       
            var deferred = $q.defer();
            $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json', 
                {
                    params:{category: categoryByShortName}
                }
            )
            .success(function(data) {
                service.items = dataItems;
                var shName = categoryByShortName;
                var dataData = [];
                for(var key in data)
                {
                    if(key === shName)
                    {
                        dataData.push(data[key]);
                    }
                }
                
                var dataItems = dataData[0].menu_items;
                $timeout(function () {
                    deferred.resolve(data);
                    }, 400);
            })
            .error(function() {
                deferred.reject("Failed to get category's detail");
            });
            return deferred.promise;
        };


        service.getAllCategories = function () {

            var deferred = $q.defer();
            $http.get( " https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
            .success(function(data) {
                service.items = data;
                $timeout(function () {
                    deferred.resolve(data);
                    }, 400);
            })
            .error(function() {
                deferred.reject("Failed to get categories");
            });

            return deferred.promise;
        };

    }

})();
