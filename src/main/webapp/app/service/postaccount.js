"use strict";

(function () {

    
    function PostAccountService (accountDal) {

        this.saveAccount = function(jsonInfo)
        {
        	return accountDal.saveAccount(jsonInfo);
        };
        
    }
    
    angular.module("accountApp").service("PostAccountService", ['accountDal', PostAccountService]);

}());