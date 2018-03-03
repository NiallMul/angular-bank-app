(function() {

    var TransactionController =  function() {
        
    	var vm = this;
        vm.bestTrainer = "Shafeeq";
        vm.notBest = "Taddas";
    };

    angular.module('accountApp').controller('transactionController', [TransactionController]);
}());