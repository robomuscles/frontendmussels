;(function() {

	angular
	.module('boilerplate')
	.controller('ResultsController', ResultsController);

	ResultsController.$inject = ['$scope', 'LocalStorage', 'QueryService', '$routeParams'];


	function ResultsController($scope, LocalStorage, QueryService, $routeParams) {
		var self = this;
		queryURL = 'data?biomimic=' +
		$routeParams.biomimic +'&region=' +
		$routeParams.region + '&zone=' +
		$routeParams.zone + '&subzone=' +
		$routeParams.subzone + '&startDate=' +
		$routeParams.startDate + '&endDate=' +
		$routeParams.endDate + '&country=' +
		$routeParams.country + '&location=' + 
		$routeParams.site;
		console.log(queryURL);


		QueryService.query('GET', queryURL, {}, {})
    .then(function(resultData) {

      $scope.resultData = resultData.data.message;
      console.log(resultData);
    });






	}

} ) ();