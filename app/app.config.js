'use strict';

angular.
  module('TransactionList').
  config(['$routeProvider',
    function config($routeProvider) {

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
