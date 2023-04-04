(function () {
'use strict';

angular.module('data')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'MainMenuAppController as mainList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) { 
        return MenuDataService.getAllCategories();
      }]
    }	  
  })
  .state('itemDetail', {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/menuapp/templates/item-detail.template.html',
    controller: 'ItemDetailController as itemDetail',
    resolve: {
      item: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.itemId)
                .then(function (items) {
                  var item = [];
                  for(var key in items)
                  {
                    if(key === $stateParams.itemId)
                    {
                      item.push(items[key]);
                    }
                  }
                  return item[0].menu_items;
                });
            }]
    }
  });
  
  
}

})();
