/**
 * Results Page controller
 *
 */
 ;(function() {

 	angular
 	.module('boilerplate')
 	.controller('ResultsController', ResultsController);

 	ResultsController.$inject = ['$scope', 'LocalStorage', 'QueryService', '$routeParams'];


 	function ResultsController($scope, LocalStorage, QueryService, $routeParams) {

 		$('body').removeClass('home');

 		$scope.filters = {};
 		$scope.filters.selectedInterval = undefined;
 		$scope.intervalOptions = ["daily", "monthly", "yearly"];

 		$scope.filters.selectedStat = undefined;
 		$scope.statOptions = ["max", "min", "avg"];

 		$scope.statClass = "hide-stat";
 		$scope.biomimic = $routeParams.biomimic;
 		$scope.region = $routeParams.region;
 		$scope.zone = $routeParams.zone;
 		$scope.subzone = $routeParams.subzone;
 		$scope.startDate = $routeParams.startDate;
 		$scope.endDate = $routeParams.endDate;
 		$scope.country = $routeParams.country;
 		$scope.site = $routeParams.site;
 		$scope.waveexp = 'N/A';
 		if($routeParams.waveexp){
 			$scope.waveexp = $routeParams.waveexp;
 		}

 		var self = this;
 		queryURL =
 		'data?biomimic=' + $routeParams.biomimic +
 		'&region=' + $routeParams.region +
 		'&startDate=' + $routeParams.startDate +
 		'&endDate=' + $routeParams.endDate +
 		'&country=' + $routeParams.country +
 		'&location=' + $routeParams.site;

 		if($routeParams.zone != "All"){
 			queryURL += '&zone=' + $routeParams.zone;
 		}
 		if($routeParams.subzone != "All"){
 			queryURL += '&subzone=' + $routeParams.subzone;
 		}
 		if($routeParams.waveexp && ($routeParams.waveexp != "All")){
 			queryURL += '&waveexp=' + $routeParams.waveexp;
 		}


		// mathOp= min max avg
		// interval = daily monthly yearly


		$scope.toCSV = function(data){
			var array = data;

				var str = '';
				var line = '';

				var head = array[0];
				if ($("#quote").is(':checked')) {
					for (var index in array[0]) {
						var value = index + "";
						line += '"' + value.replace(/"/g, '""') + '",';
					}
				} else {
					for (var index in array[0]) {
						line += index + ',';
					}
				}

				line = line.slice(0, -1);
				str += line + '\r\n';

				for (var i = 0; i < array.length; i++) {
					var line = '';

					if ($("#quote").is(':checked')) {
						for (var index in array[i]) {
							var value = array[i][index] + "";
							line += '"' + value.replace(/"/g, '""') + '",';
						}
					} else {
						for (var index in array[i]) {
							line += array[i][index] + ',';
						}
					}

					line = line.slice(0, -1);
					str += line + '\r\n';
				}
				return str;
			};




		QueryService.query('GET', queryURL, {}, {})
		.then(function(resultData) {
			$scope.resultData = resultData.data.message;
			if($scope.resultData.length==0){
				$scope.alertType = "alert-info";
				$scope.alertText = "No data available.";
				$scope.alertClass = "data-no";
			} else {
				$scope.alertType = "alert-success";
				$scope.alertText = "Filtering Successful!";
				$scope.alertClass = "data-success";
				debugger;
				$scope.rawData = $scope.toCSV($scope.resultData);
			}

		});

	$scope.$watch('filters', function(value){
		if(!($scope.filters.selectedInterval === undefined) && !($scope.filters.selectedStat === undefined)){
			statQueryURL = queryURL + "&interval=" + $scope.filters.selectedInterval
			+ "&mathOp=" + $scope.filters.selectedStat;
			QueryService.query('GET', statQueryURL, {}, {})
			.then(function(statData){
				$scope.statData = statData.data.message;
				$scope.statCSV = $scope.toCSV($scope.statData);
				$scope.statClass = "view-stat";
			});
		}

	}, true);
$('#download-raw').on('click', function(){
	window.open("data:text/csv;charset=utf-8," + escape($scope.rawData));
});

$('#download-stat').on('click', function(){
	window.open("data:text/csv;charset=utf-8," + escape($scope.statCSV));
});






}

} ) ();
