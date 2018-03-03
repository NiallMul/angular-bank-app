"use strict";

(function() {

    var addAccountController =  function(PostAccountService, $log,$window,$stateParams) {
        
    	var vm = this;
        
        vm.account;
        $log.log("AddAccountController entered");
        vm.addAccount = function(fName,lName,accntNumber){
        	vm.account = 
        		{firstName:fName,
	        	secondName:lName,
	        	accountNumber:accntNumber};
        	
        	PostAccountService.saveAccount(vm.account).then(function(results){
    			$log.log(results.message);
        		if(results.message==="account has been successfully added"){
        			$window.location.href = 'http://localhost:8080/customer-app/#/getAccount';
        		}
        		
        	});
        }
        
        vm.isUpdate = function(){
        	if($stateParams.accountId){
            	$log.log($stateParams.accountId);
        		return false;
        	}
        	$log.log("true");
        	return true;
        };
    };

    angular.module('accountApp').controller('addAccountController', ['PostAccountService','$log','$window','$stateParams', addAccountController]);
}());