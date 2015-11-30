;(function() {

	angular
	.module('boilerplate')
	.controller('ResultsController', ResultsController);

	ResultsController.$inject = ['LocalStorage', 'QueryService', '$routeParams'];


	function ResultsController(LocalStorage, QueryService, $routeParams) {
		var self = this;
		self.biomimic = $routeParams.biomimic;
	}

} ) ();