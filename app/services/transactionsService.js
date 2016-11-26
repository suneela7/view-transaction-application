'use strict';

angular.module('transactionService.module')
	.factory('transactionsService', ['$http', '$filter', function($http, $filter) {
		var allTransactionList = [];

		var processTransactionsData =  function(transactions) {
	       var transactionDetailsArray = [];
	       var yearsOnly = [];
	       var yearTransObj = [];
	       angular.forEach(transactions, function(transaction, index) {
	           var yearObject =
	             {
	               "year" : $filter('date')(transaction['transaction-time'], 'yyyy', 'UTC'),
	               "month":$filter('date')(transaction['transaction-time'], 'MMM', 'UTC') ,
	               "amount" : transaction.amount,
	               "merchant" : transaction.merchant
	             };
	           yearTransObj.push(yearObject);
	           if(yearsOnly.indexOf($filter('date')(transaction['transaction-time'], 'yyyy', 'UTC')) === -1) {
	              yearsOnly.push($filter('date')(transaction['transaction-time'], 'yyyy', 'UTC'));
	           }	           
	       });

	       return {
	       	 "yearTransObj" : yearTransObj,
	       	 "yearsOnly": yearsOnly
	       };

	    }
	       
	    var averagespendings = [];
	    var filterUntilMonth = function(years, transObj) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            angular.forEach(years, function(year, indexYear) {
            var transObjByYear = $filter('filter')(transObj, year);
            angular.forEach(months, function(month, indexMonth) {
               var income =0,spent = 0;
               var transObjByMonth = $filter('filter')(transObjByYear, month);
               var countIncome =0, countSpent =0;
               if(transObjByMonth.length > 0){
                  angular.forEach(transObjByMonth, function(singleTrans, indexTrans) {
	                  var amount = singleTrans.amount;
	                  /*if(singleTrans.merchant === "Dunkin #336784" && singleTrans.merchant === "Krispy Kreme Donuts") {
	                  	amount = 0;
	                  } else {
	                  	amount = 
	                  }*/
	                  if(amount < 0) {
	                  	/*if(singleTrans.merchant === "Dunkin #336784" && singleTrans.merchant === "Krispy Kreme Donuts") {
	                  		spent = spent;
	                      	countSpent = countSpent;
	                  	} else {
	                  		spent = spent + (amount);
	                      	countSpent++;
	                  	}*/	
	                  	spent = spent + (amount);
	                      	countSpent++;                    
	                  } else {
	                    income = income + (amount);
	                      countIncome++
	                  }
                  });


                  var averageIncomePerMonth = income/countIncome;
                  var averageSpentPerMonth = spent/countSpent;
                  var averageTransactions = {
                    "month": month,
                    "year" : year,
                    "averageIncome" : averageIncomePerMonth,
                    "averageSpent" : averageSpentPerMonth
                  };
                  averagespendings.push(averageTransactions);                  
               }
            });
          });
          console.log("averageobject", averagespendings)
          return averagespendings;
       }
	    
		return {
			getAverageSpendings : function() {
				return averagespendings;
			},
			getAllTransaction : function () {
				return allTransactionList;
			},
			fetchAllTransactions : function() {
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

			    return $http(req).then(function(response) {
			    	if(response && response.data) {
			    		allTransactionList = response.data.transactions;
			    		var processedTransactionsData = processTransactionsData(response.data.transactions);
			    		 
			    		averagespendings = filterUntilMonth(processedTransactionsData.yearsOnly, processedTransactionsData.yearTransObj);
			    		return {
			    			allTransactionList : allTransactionList,
			    			averagespendings : averagespendings
			    		};
			    	}
			    });
			}
		}
	}])