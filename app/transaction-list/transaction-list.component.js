'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('transactionList').
  component('transactionList', {
    templateUrl: 'transaction-list/transaction-list.template.html',
    controller: ['$http', '$scope', function PhoneListController($http, $scope) {
      
      var req = {
        method: 'POST',
        url: 'https://2016.api.levelmoney.com/api/v2/core/get-all-transactions',
        headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
        },
        data: { 
          
          "args": 
            {
              "uid":  1110590645, 
              "token":  "2D8A242A365DB3FB7009EEF9E5782EB7", 
              "api-token":  "AppTokenForInterview", 
              "json-strict-mode": false, 
              "json-verbose-response": false
            } 
                   
        }
      };

    $http(req).then(function successtransaction(response){
      var self = this;
      var transactions;
      var transactionsArray;
      console.log("successtransaction", response);
        transactions = new Array(response.data.transactions);
        $scope.transactions = transactions[0];
      }, 
      function onerror(response){
        console.log("onerror", response);
      });
    
    }]
  });
