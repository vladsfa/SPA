(function () {
'use strict';

angular.module('data')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['$stateParams', 'item', '$scope'];
function ItemDetailController($stateParams, item, $scope) {
    var itemDetail = this;
    itemDetail.name = $stateParams.itemId;

    var items = [];

    for (var i = 0; i < item.length; i++) 
    { 
        items.push('('+ item[i].short_name +') ' + item[i].name + ': '+ item[i].description + '.');
    }
    $scope.items = items;
}

})();
