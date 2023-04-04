(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('items', {
      templateUrl: 'src/templates/item-detail.template.html',
      bindings: {
        items: '<'
      }
    });
    
    })();