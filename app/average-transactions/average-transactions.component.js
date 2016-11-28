'use strict';

angular.
  module('averageTransactions').
  component('averageTransactions', {
    templateUrl: 'average-transactions/average-transactions.template.html',
    controller: [ '$scope', '$filter', 'transactionsService', '$window', function averageTransactionsController($scope, $filter, transactionsService, $window) {

      this.$onInit = function() {
        if(transactionsService.getAverageSpendings().length ==0) {
          transactionsService.fetchAllTransactions().then(function(data) {
            $scope.averageSpendings = data.averagespendings;
            console.log("averagespendings", $scope.averagespendings);
          });
        } else {
          $scope.averageSpendings = transactionsService.getAverageSpendings();
          console.log("averagespendings", $scope.averagespendings);
        }

      }
      $scope.ignoreDonuts = function(ignoreDonutFlag) {        
        transactionsService.fetchAllTransactions(ignoreDonutFlag).then(function(data) {
            $scope.averageSpendings = data.averagespendings;
        });
      }
    }]

  });
