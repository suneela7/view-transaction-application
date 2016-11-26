'use strict';

angular.
  module('TransactionList').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/transactions', {
          template:'<transaction-list></transaction-list>'
        }).
        when('/averageTransactions', {
          template:'<average-transactions></average-transactions>'
        }).
        otherwise('/transactions');
    }
  ]);
