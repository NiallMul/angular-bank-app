"use strict";

(function () {

    angular.module('accountApp').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/feature/dashboard/dashboard.html"
        }).state("account", {
                url: "/getAccount",
                templateUrl: "app/feature/account/getAccount/account.html"
        }).state("addaccount", {
            url: "/addaccount",
            templateUrl: "app/feature/account/addAccount/addAccount.html"
	    }).state("updateaccount", {
	        url: "/updateaccount",
	        params: {
	        	accountId:null,
	        	firstName:null,
	        	secondName:null,
	        	accountNumber:null
	        },
	        templateUrl: "app/feature/account/addAccount/addAccount.html"
	    })
    });
}());