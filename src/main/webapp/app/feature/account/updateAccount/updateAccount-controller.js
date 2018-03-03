"use strict";

(function() {

    var updateAccountController =  function(UpdateAccountService, $log, $stateParams,$window) {
        
    	var vm = this;
    	vm.id;
    	vm.fName;
    	vm.lName;
    	vm.accntNum;

    	vm.isUpdate = function(){
        	$log.log("Inside update isUpdate function: "+$stateParams.accountId);
        	if($stateParams.accountId){
        		return true;
        	}
        	$log.log("update null");
        	return false;
        };
		vm.id = $stateParams.accountId;
		vm.fName = $stateParams.firstName;
		vm.lName = $stateParams.secondName;
		vm.accntNum = $stateParams.accountNumber;
		
       vm.updateAccount=function(){
       	vm.account = {
       	id:vm.id,
       	firstName:vm.fName,
    	secondName:vm.lName,
    	accountNumber:vm.accntNum};
	
       	UpdateAccountService.updateAccount(vm.account).then(function(results){
			$log.log(results.message);
		if(results.message==="account successfully updated"){
			$window.alert("Update successful");
			$window.location.href = 'http://localhost:8080/customer-app/#/getAccount';
		}});
       }
    };

    angular.module('accountApp').controller('updateAccountController', ['UpdateAccountService','$log','$stateParams','$window', updateAccountController]);
}());