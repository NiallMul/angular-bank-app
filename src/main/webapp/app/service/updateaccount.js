"use strict";

(function () {

    
    function UpdateAccountService ($log,accountDal) {

        this.updateAccount = function(jsonInfo)
        {
        	$log.log("UpdateAccountService: "+jsonInfo);
        	return accountDal.updateAccount(jsonInfo);
        };
        
    }
    
    angular.module("accountApp").service("UpdateAccountService", ['$log','accountDal', UpdateAccountService]);

}());