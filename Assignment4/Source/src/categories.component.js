(function () {
    'use strict';
    
    angular.module('data')
    .component('categories', {
      templateUrl: 'src/templates/categories-list.template.html',
      bindings: {
        items: '<'
      }
    });
    
    })();