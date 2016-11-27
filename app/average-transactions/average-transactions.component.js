'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('averageTransactions').
  component('averageTransactions', {
    templateUrl: 'average-transactions/average-transactions.template.html',
    controller: [ '$scope', '$filter', 'transactionsService', '$route', function averageTransactionsController($scope, $filter, transactionsService, $route) {

      this.$onInit = function() {
        if(transactionsService.getAverageSpendings().length ==0) {
          transactionsService.fetchAllTransactions().then(function(data) {
            $scope.averageSpendings = data.averagespendings;
          });
        } else {
          $scope.averageSpendings = transactionsService.getAverageSpendings();
        }

      }
      $scope.ignoreDonuts = function(ignoreDonutFlag) {
        transactionsService.fetchAllTransactions(ignoreDonutFlag).then(function(data) {
            $scope.averageSpendings = data.averagespendings;
        });
        $route.reload();
      }
    }]

  });
