'use strict';
require('./create-data-table.scss');
const angular = require('angular');
const moment = require('moment');
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
  $scope.reverse = function() {
    $scope.lists.reverse();
  };
  $scope.sortingByMonthFilter = function(year, month) {
    console.log('filtering');
    $scope.unfilteredLists = $scope.lists;
    $scope.lists = $scope.lists.filter((record) => {
      console.log(record);
      return record.date.includes(`${year}-${month}`);
    });
  };

  $scope.getLastWeek = function() {
    $scope.unfilteredLists = $scope.lists;
    $scope.lists = $scope.lists.filter((record) => {
      // var d = moment().toObject();
      // var e = d.date-7;
      // var f = d.month;
      // var g = d.year;
      // console.log(e);


    });
  };

  $scope.getLastMonth = function(){
    $scope.unfilteredLists = $scope.lists;
    $scope.lists = $scope.lists.filter((record) => {
      var today = new Date();
      var currentMonth = today.getMonth();
      var currentYear = today.getFullYear();
      var recordDate =  new Date(record.date);
      var recordYear = recordDate.getFullYear();
      var recordMonth = recordDate.getMonth();
      var lastMonth = currentMonth -1;
      if (recordYear === currentYear){
        if (recordMonth === lastMonth && lastMonth !== 0 ){
          console.log(record);
          return record;
        }
        if(recordMonth === lastMonth && lastMonth === 0 ){
          recordYear = currentYear -1;
          recordMonth = 11;
          return record;
        }
      }
    });
  };





  $scope.sortType = 'name';
  $scope.sortReverse = false;
  $scope.searchData = '';

}

// $scope.unfilteredLists = $scope.lists;
// $scope.lists = $scope.lists.filter((record) => {
//   var recordDate =  new Date(record.date);
//   var recordYear = recordDate.getFullYear();
//   var recordMonth = recordDate.getMonth();
//   var lastMonth = moment().subtract(1,'months');
//   console.log(lastMonth.month());
//   console.log(lastMonth.year());
//   if (recordYear === lastMonth.year()){
//     if (recordMonth === lastMonth.month){
//       console.log(record);
//       return record;
//     }
//   }


// var today = new Date();
// var currentYear = today.getFullYear();
// var currentMonth = today.getMonth();
// var currentDay = today.getDate();
// var recordDate =  new Date(record.date);
// var recordYear = recordDate.getFullYear();
// var recordMonth = recordDate.getMonth();
// var recordDay = recordDate.getDate();
// var lastWeekDays = [];
// var firstDayOfLastWeek = currentDay -7;
// for(var i = currentDay; i >= firstDayOfLastWeek; i--){
//   lastWeekDays.push(i);
// }
// console.log(lastWeekDays);
// if (recordYear === currentYear){
//   if (recordMonth === currentMonth){
//     if (lastWeekDays[v] == recordDay){
//       return record;
//     }
//   }
// }
