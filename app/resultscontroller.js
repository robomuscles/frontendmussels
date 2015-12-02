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
		if($routeParams.waveexp){
			queryURL += '&waveexp=' + $routeParams.waveexp;
		}
		console.log(queryURL);


		QueryService.query('GET', queryURL, {}, {})
		.then(function(resultData) {
			$scope.resultData = resultData.data.message;
			var array = $scope.resultData;

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
			$scope.CSVdata = str;
			debugger;
			return str;


		});

		$('#download').on('click', function(){
			window.open("data:text/csv;charset=utf-8," + escape($scope.CSVdata));
		})

		$scope.JSON2CSV = function (objArray) {
			

		}






	}

} ) ();