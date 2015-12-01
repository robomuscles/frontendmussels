;(function() {

	angular
	.module('boilerplate')
	.controller('ResultsController', ResultsController);

	ResultsController.$inject = ['$scope', 'LocalStorage', 'QueryService', '$routeParams'];


	function ResultsController($scope, LocalStorage, QueryService, $routeParams) {
		var self = this;
		queryURL = 'data?biomimic=' +
		$routeParams.biomimic + '&country=' +
		$routeParams.country + '&region=' +
		$routeParams.region + '&site=' +
		$routeParams.site + '&zone=' +
		$routeParams.zone + '&subzone=' +
		$routeParams.subzone + ($routeParams.waveexp) ? '&waveexp=' +
		$routeParams.waveexp :  + '&startDate=' +
		$routeParams.startDate + '&endDate=' +
		$routeParams.endDate;
		console.log(queryURL);


		QueryService.query('GET', queryURL, {}, {})
    .then(function(resultData) {

      $scope.resultData = resultData.data.message;
      debugger;
      console.log(resultData);
    });






	}

} ) ();