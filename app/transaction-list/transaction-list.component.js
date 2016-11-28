'use strict';

angular.
  module('transactionList').
  component('transactionList', {
    templateUrl: 'transaction-list/transaction-list.template.html',
    controller: [ '$scope', '$filter', 'transactionsService', function PhoneListController($scope, $filter, transactionsService) {
    
   
      this.$onInit = function() {
        if(transactionsService.getAllTransaction().length ==0 ) {
          transactionsService.fetchAllTransactions().then(function(data) {
            $scope.transactions = data.allTransactionList;
          });
        } else {
          $scope.transactions = transactionsService.getAllTransaction();
        }
      }
    }]



  });
