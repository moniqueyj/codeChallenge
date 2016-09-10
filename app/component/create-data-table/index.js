'use strict';
require('./create-data-table.scss');
const angular = require('angular');
const sampleApp = angular.module('sampleApp');

sampleApp.component('createDataTable',{
  template: require('./create-data-table.html'),
  controller: 'CreateTableController',
  controllerAs:'creatteTableCtrl'
});

sampleApp.controller('CreateTableController', ['$scope', '$http', CreateTableController]);
function CreateTableController($scope, $http){
  var list = { content:null};
  $http.get('../../data/basedata.json').success(function(data){
    list.content = data;
  });
  console.log(list);
  return list;
}
