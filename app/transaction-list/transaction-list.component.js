'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('transactionList').
  component('transactionList', {
    templateUrl: 'transaction-list/transaction-list.template.html',
    controller: ['$http', '$scope', '$filter', function PhoneListController($http, $scope, $filter) {

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
       $scope.transactions = response.data.transactions;
       $scope.processedData =  $scope.processData($scope.transactions);
       $scope.transObjByYear = $scope.filterUntilMonth($scope.yearsOnly, $scope.yearTransObj);
     },
     function onerror(response){
       console.log("onerror", response);
     });
     $scope.processData =  function(transactions) {
       $scope.transactionDetailsArray = [];
       $scope.yearsOnly = [];
       //$scope.yearTransactionObject = [];
       $scope.yearTransObj = [];
       angular.forEach(transactions, function(transaction, index) {

           $scope.yearObject =
             {
               "year" : $filter('date')(transaction['transaction-time'], 'yyyy', 'UTC'),
               "month":$filter('date')(transaction['transaction-time'], 'MMM', 'UTC') ,
               "amount" : transaction.amount
             };
           //$scope.yearTransObj[$filter('date')(transaction['transaction-time'], 'yyyy', 'UTC')] = $scope.yearObject;
           $scope.yearTransObj.push($scope.yearObject);
           if($scope.yearsOnly.indexOf($filter('date')(transaction['transaction-time'], 'yyyy', 'UTC')) === -1) {
              $scope.yearsOnly.push($filter('date')(transaction['transaction-time'], 'yyyy', 'UTC'));
           }
           //console.log("$scope.yearTransObj ",$scope.yearTransObj);
           //$scope.yearTransactionObject.push($scope.yearTransObj);
       });
       //console.log("$scope.yearTransactionObject ", $scope.yearTransactionObject);
       }
       $scope.filterUntilMonth = function(years, transObj) {
            $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            angular.forEach(years, function(year, indexYear) {
            $scope.transObjByYear = $filter('filter')(transObj, year);
            //console.log("scope.transaObjByYear" + year, $scope.transObjByYear);

            angular.forEach($scope.months, function(month, indexMonth) {
               var income =0,spent = 0;
               $scope.transObjByMonth = $filter('filter')($scope.transObjByYear, month);
               console.log("scope.transaObjByMonth" + year+" "+month+" "+$scope.transObjByMonth);
                                                               var countIncome =0, countSpent =0;
               if($scope.transObjByMonth.length > 0){
                  angular.forEach($scope.transObjByMonth, function(singleTrans, indexTrans) {
                  var amount = singleTrans.amount;

                  if(amount < 0) {
                    spent = spent + (amount);
                      countSpent++;
                  } else {
                    income = income + (amount);
                      countIncome++
                  }
                  //console.log (year + month + "Income:"+ income + "countIncome" +countIncome +"spent:"+spent+"countSpent:"+countSpent);
                  });
                  $scope.averageIncomePerMonth = income/countIncome;
                  $scope.averageSpentPerMonth = spent/countSpent;
                  console.log (year + month + "Income:"+ income + "countIncome" +countIncome +"spent:"+spent+"countSpent:"+countSpent);

               }
            })
          })
       }
    }]
  });
