"use strict";

(function() {

	var getAccountController = function(accountService, $log,$state,$window) {

		var vm = this;
		$log.log("blah");

		vm.isHidden = false;

		vm.hideTable = function() {
			vm.isHidden = !vm.isHidden
		};

		function init() {
			accountService.getAccounts().then(function(results) {
				vm.accounts = results;
				$log.log("In the account controller the value of the result promise is ");
				$log.log(JSON.stringify(vm.accounts));
			}, function(error) {
				vm.error = true;
				vm.errorMessage = error;
			});
		}

		init();

		vm.updateAccount = function(accntid, fname, sname, accntnum) {
			$state.go('updateaccount', {
				accountId : accntid,
				firstName : fname,
				secondName : sname,
				accountNumber : accntnum
			});
		//$window.location.href = 'http://localhost:8080/customer-app/#/addaccount';	
		}

		vm.removeAccount = function(accntid, fname, sname, accntnum) {
			var vm = this;
			vm.id = accntid;
			vm.fName = fname;
			vm.lName = sname;
			vm.accntNum = accntnum;

			vm.account = {
				id : vm.id,
				firstName : vm.fName,
				secondName : vm.lName,
				accountNumber : vm.accntNum
			};
			if($window.confirm("Are you sure you wish to delete this account")){
			accountService.deleteAccount(vm.account).then(function(results) {
    			$log.log(results);
				if(results.message==="account successfully deleted"){
					$window.alert("Delete successful");
					init();
				}
			});
		}}

	};

	angular.module('accountApp').controller('getAccountController', [ 'accountService', '$log', '$state','$window', getAccountController ]);
}());