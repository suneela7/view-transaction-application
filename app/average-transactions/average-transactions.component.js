'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('averageTransactions').
  component('averageTransactions', {
    templateUrl: 'average-transactions/average-transactions.template.html',
    controller: [ '$scope', '$filter', 'transactionsService', function averageTransactionsController($scope, $filter, transactionsService) {

      this.$onInit = function() {
        if(transactionsService.getAverageSpendings().length ==0) {
          transactionsService.fetchAllTransactions().then(function(data) {
            $scope.averageSpendings = data.averagespendings;
          });
        } else {
          $scope.averageSpendings = transactionsService.getAverageSpendings();
        }        
      }
    }]

  });
