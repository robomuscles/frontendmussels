/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
 ;(function() {

  angular
  .module('boilerplate')
  .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'LocalStorage', 'QueryService'];


  function MainController($scope, LocalStorage, QueryService) {

    // 'controller as' syntax
    
    
    

    // var $scope = this;
    $scope.filters = {};
    $scope.filters.selectedBiomimic = undefined;
    $scope.filters.selectedCountry = undefined;
    $scope.filters.selectedRegion = undefined;
    $scope.filters.selectedZone = undefined;
    $scope.filters.selectedSubzone = undefined;
    $scope.filters.selectedWaveExp = undefined;
    $scope.filters.startDate = new Date();
    $scope.filters.endDate = new Date();

    $scope.datepickerOptions =
    {
      format: 'yyyy-mm-dd',
      autoclose: true,
      weekstart: 0
    }
    

    /**
     * Load some data
     * @return {Object} Returned object
     */


    // biomimic options loaded on page load
    QueryService.query('GET', 'filter/biomimic', {}, {})
    .then(function(biomimicOptions) {
      $scope.biomimicOptions = biomimicOptions.data.message;
    });

    // country options
    $scope.showCountryOptions = function () {
      $scope.filters.selectedCountry = undefined;
      console.log($scope.filters.selectedBiomimic);
      QueryService.query('GET', 'filter/country?biomimic=' + $scope.filters.selectedBiomimic, {}, {})
      .then(function(countryOptions) {
        $scope.countryOptions = countryOptions.data.message;

      })
    };

    // region options
    $scope.showRegionOptions = function () {
      $scope.filters.selectedRegion = undefined;
      var url = 'filter/region?biomimic=' + $scope.filters.selectedBiomimic + '&country=' + $scope.filters.selectedCountry;
      QueryService.query('GET', url, {}, {})
      .then(function(regionOptions) {
        $scope.regionOptions = regionOptions.data.message;
      });
    };

    // site site options
    $scope.showSiteOptions = function () {
      $scope.filters.selectedSite = undefined;
      var queries = '?biomimic=' + $scope.filters.selectedBiomimic + '&country=' + $scope.filters.selectedCountry + '&region=' + $scope.filters.selectedRegion;
      var url = 'filter/location' + queries;
      QueryService.query('GET', url, {}, {})
      .then(function(siteOptions) {
        $scope.siteOptions = siteOptions.data.message;
      });
    };

    // show zone options
    $scope.showZoneOptions = function () {
      $scope.filters.selectedZone = undefined;
      var queries = '?biomimic=' + 
      $scope.filters.selectedBiomimic + '&country=' + 
      $scope.filters.selectedCountry + '&region=' + 
      $scope.filters.selectedRegion + '&location=' + 
      $scope.filters.selectedSite;
      var url = 'filter/zone' + queries;
      QueryService.query('GET', url, {}, {})
      .then(function(zoneOptions) {
        $scope.zoneOptions = zoneOptions.data.message;
      });
    };

    // show subzone options
    $scope.showSubzoneOptions = function () {
      $scope.filters.selectedSubzone = undefined;
      var queries = '?biomimic=' + 
      $scope.filters.selectedBiomimic + '&country=' + 
      $scope.filters.selectedCountry + '&region=' + 
      $scope.filters.selectedRegion + '&location=' + 
      $scope.filters.selectedSite + '&zone=' + 
      $scope.filters.selectedZone;
      var url = 'filter/subzone' + queries;
      QueryService.query('GET', url, {}, {})
      .then(function(subzoneOptions) {
        $scope.subzoneOptions = subzoneOptions.data.message;
      });
    };

    // show wave exposure options
    $scope.showWaveExpOptions = function () {
      $scope.filters.selectedWaveExp = undefined;
      var queries = '?biomimic=' + 
      $scope.filters.selectedBiomimic + '&country=' + 
      $scope.filters.selectedCountry + '&region=' + 
      $scope.filters.selectedRegion + '&location=' + 
      $scope.filters.selectedSite + '&zone=' + 
      $scope.filters.selectedZone + '&subzone=' + 
      $scope.filters.selectedSubzone;
      var url = 'filter/waveexp' + queries;
      QueryService.query('GET', url, {}, {})
      .then(function(waveExpOptions) {
        $scope.waveExpOptions = waveExpOptions.data.message;
      });
    };


    $scope.$watch('filters.endDate', function(value){
      if($scope.filters.endDate==undefined){

      }
      else{
        console.log($scope.filters.selectedWaveExp);
        var url = '#/results';
        var filterArray = [
        $scope.filters.selectedBiomimic,
        $scope.filters.selectedCountry, 
        $scope.filters.selectedRegion,
        $scope.filters.selectedSite,
        $scope.filters.selectedZone,
        $scope.filters.selectedSubzone,
        $scope.filters.startDate, 
        $scope.filters.endDate,
        $scope.filters.selectedWaveExp]
        for (var i = 0; i < filterArray.length; i++){
          if(!(filterArray[i] === "N/A")){
            url+= "/" + encodeURIComponent(filterArray[i].trim())
          }


        }
        $('#results').html("<a class='link' href='"+url+"'>Go Here!</a>");
      }
    });

  }

})();
