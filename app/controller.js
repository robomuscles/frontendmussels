/**
 * Homepage controller
 *
 */
 ;(function() {

  angular
  .module('boilerplate')
  .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'LocalStorage', 'QueryService'];


  function MainController($scope, LocalStorage, QueryService) {

    // 'controller as' syntax

    $('body').addClass('home');

    var placeholderDate = new Date();
    $scope.filters = {};
    $scope.filters.selectedBiomimic = undefined;
    $scope.filters.selectedCountry = undefined;
    $scope.filters.selectedRegion = undefined;
    $scope.filters.selectedZone = undefined;
    $scope.filters.selectedSubzone = undefined;
    $scope.filters.selectedWaveExp = undefined;
    $scope.filters.startDate = placeholderDate;
    $scope.filters.endDate = placeholderDate;

    $scope.datepickerOptions =
    {
      format: 'MM d, yyyy',
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
      $scope.filters.selectedRegion = undefined;
      $scope.filters.selectedSite = undefined;
      $scope.filters.selectedZone = undefined;
      $scope.filters.selectedSubzone = undefined;
      $scope.filters.selectedWaveExp = undefined;
      console.log($scope.filters.selectedBiomimic);
      QueryService.query('GET', 'filter/country?biomimic=' + $scope.filters.selectedBiomimic, {}, {})
      .then(function(countryOptions) {
        $scope.countryOptions = countryOptions.data.message;

      })
    };

    // region options
    $scope.showRegionOptions = function () {
      $scope.filters.selectedRegion = undefined;
      $scope.filters.selectedSite = undefined;
      $scope.filters.selectedZone = undefined;
      $scope.filters.selectedSubzone = undefined;
      $scope.filters.selectedWaveExp = undefined;
      var url = 'filter/region?biomimic=' + $scope.filters.selectedBiomimic + '&country=' + $scope.filters.selectedCountry;
      QueryService.query('GET', url, {}, {})
      .then(function(regionOptions) {
        $scope.regionOptions = regionOptions.data.message;
      });
    };

    // site site options
    $scope.showSiteOptions = function () {
      $scope.filters.selectedSite = undefined;
      $scope.filters.selectedZone = undefined;
      $scope.filters.selectedSubzone = undefined;
      $scope.filters.selectedWaveExp = undefined;
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
      $scope.filters.selectedSubzone = undefined;
      $scope.filters.selectedWaveExp = undefined;
      var queries = '?biomimic=' +
      $scope.filters.selectedBiomimic + '&country=' +
      $scope.filters.selectedCountry + '&region=' +
      $scope.filters.selectedRegion + '&location=' +
      $scope.filters.selectedSite;
      var url = 'filter/zone' + queries;
      QueryService.query('GET', url, {}, {})
      .then(function(zoneOptions) {
        $scope.zoneOptions = zoneOptions.data.message;
        if (zoneOptions.data.message.length > 1) {
          $scope.zoneOptions.unshift("All");
        }
      });
    };

    // show subzone options
    $scope.showSubzoneOptions = function () {
      $scope.filters.selectedSubzone = undefined;
      $scope.filters.selectedWaveExp = undefined;
      var queries =
        '?biomimic=' + $scope.filters.selectedBiomimic +
        '&country=' + $scope.filters.selectedCountry +
        '&region=' + $scope.filters.selectedRegion +
        '&location=' + $scope.filters.selectedSite;;

      // include zone in query but only if it isn't All
      if ($scope.filters.selectedZone != 'All') {
        queries += '&zone=' + $scope.filters.selectedZone;
      }

      var url = 'filter/subzone' + queries;
      QueryService.query('GET', url, {}, {})
      .then(function(subzoneOptions) {
        $scope.subzoneOptions = subzoneOptions.data.message;
        if (subzoneOptions.data.message.length > 1) {
          $scope.subzoneOptions.unshift("All");
        }
      });
    };

    // show wave exposure options
    $scope.showWaveExpOptions = function () {
      $scope.filters.selectedWaveExp = undefined;
      var queries =
        '?biomimic=' + $scope.filters.selectedBiomimic +
        '&country=' + $scope.filters.selectedCountry +
        '&region=' + $scope.filters.selectedRegion +
        '&location=' + $scope.filters.selectedSite;

      // include zone in query but only if it isn't All
      if ($scope.filters.selectedZone != 'All') {
        queries += '&zone=' + $scope.filters.selectedZone;
      }
      // include subzone in query but only if it isn't All
      if ($scope.filters.selectedSubzone != 'All') {
        queries += '&subzone=' + $scope.filters.selectedSubzone;
      }

      var url = 'filter/waveexp' + queries;
      QueryService.query('GET', url, {}, {})
      .then(function(waveExpOptions) {
        $scope.waveExpOptions = waveExpOptions.data.message;
        if (waveExpOptions.data.message.length > 1) {
          $scope.waveExpOptions.unshift("All");
        }
      });
    };

    // update the filter url whenever a filter changes
    $scope.$watch('filters', function(value){
      var url = '#/results';
      var start = new Date($scope.filters.startDate).toISOString().slice(0,10);
      var end = new Date($scope.filters.endDate).toISOString().slice(0,10);
      var filterArray = [
      $scope.filters.selectedBiomimic,
      $scope.filters.selectedCountry,
      $scope.filters.selectedRegion,
      $scope.filters.selectedSite,
      $scope.filters.selectedZone,
      $scope.filters.selectedSubzone,
      start,
      end,
      $scope.filters.selectedWaveExp]
      for (var i = 0; i < filterArray.length; i++){
        if(!(filterArray[i] === "N/A")){
          url+= "/" + encodeURIComponent(filterArray[i])
        }


      }
      $('#results').html("<a class='link' href='"+url+"'>Filter Data</a>");

    }, true);

  }

})();
