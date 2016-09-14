'use strict';
require('./create-data-table.scss');
const angular = require('angular');
const sampleApp = angular.module('sampleApp');

sampleApp.component('createDataTable',{
  template: require('./create-data-table.html'),
  controller: 'CreateTableController',
  controllerAs:'createTableCtrl'
});

sampleApp.factory('listsFactory', function($q,$http){
  return {
    getLists: function(){
      var deferred = $q.defer(),
        httpPromise = $http.get('https://gist.githubusercontent.com/evanjacobs/c150c0375030dc4de65e9b95784dc894/raw/35c5f455b147703db3989df0cb90f5781c3b312f/usage_data.json');
      httpPromise.then(function(response){
        deferred.resolve(response);
      }, function(error){
        console.error(error);
      });
      return deferred.promise;
    }
  };
});

sampleApp.controller('CreateTableController', ['$scope', '$http','listsFactory', CreateTableController]);

function CreateTableController($scope,$http, listsFactory){
  listsFactory.getLists().then(function(response){
    $scope.lists = response.data;
    console.log($scope.lists);
  }, function(error){
    console.error(error);
  });
}
