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

  MainController.$inject = ['LocalStorage', 'QueryService'];


  function MainController(LocalStorage, QueryService) {

    // 'controller as' syntax
    var self = this;
    self.selectedBiomimic = undefined;
    self.selectedCountry = undefined;
    self.selectedRegion = undefined;
    self.selectedZone = undefined;
    self.selectedSubzone = undefined;
    self.selectedWaveExp = undefined;

    /**
     * Load some data
     * @return {Object} Returned object
     */


    // biomimic options loaded on page load
    QueryService.query('GET', 'filter/biomimic', {}, {})
      .then(function(biomimicOptions) {
        self.biomimicOptions = biomimicOptions.data.message;
    });

    // country options
    self.showCountryOptions = function () {
      self.selectedCountry = undefined;
      QueryService.query('GET', 'filter/country?biomimic=' + self.selectedBiomimic, {}, {})
        .then(function(countryOptions) {
          self.countryOptions = countryOptions.data.message;
      })
    };

    // region options
    self.showRegionOptions = function () {
      self.selectedRegion = undefined;
      var url = 'filter/region?biomimic=' + self.selectedBiomimic + '&country=' + self.selectedCountry;
      QueryService.query('GET', url, {}, {})
        .then(function(regionOptions) {
          self.regionOptions = regionOptions.data.message;
      });
    };

    // site site options
    self.showSiteOptions = function () {
      self.selectedSite = undefined;
      var queries = '?biomimic=' + self.selectedBiomimic + '&country=' + self.selectedCountry + '&region=' + self.selectedRegion;
      var url = 'filter/location' + queries;
      QueryService.query('GET', url, {}, {})
        .then(function(siteOptions) {
          self.siteOptions = siteOptions.data.message;
      });
    };

    // show zone options
    self.showZoneOptions = function () {
      self.selectedZone = undefined;
      var queries = '?biomimic=' + self.selectedBiomimic + '&country=' + self.selectedCountry + '&region=' + self.selectedRegion + '&location=' + self.selectedSite;
      var url = 'filter/zone' + queries;
      QueryService.query('GET', url, {}, {})
        .then(function(zoneOptions) {
          self.zoneOptions = zoneOptions.data.message;
      });
    };

    // show subzone options
    self.showSubzoneOptions = function () {
      self.selectedSubzone = undefined;
      var queries = '?biomimic=' + self.selectedBiomimic + '&country=' + self.selectedCountry
        + '&region=' + self.selectedRegion + '&location=' + self.selectedSite + '&zone=' + self.selectedZone;
      var url = 'filter/subzone' + queries;
      QueryService.query('GET', url, {}, {})
        .then(function(subzoneOptions) {
          self.subzoneOptions = subzoneOptions.data.message;
      });
    };

    // show wave exposure options
    self.showWaveExpOptions = function () {
      self.selectedWaveExp = undefined;
      var queries = '?biomimic=' + self.selectedBiomimic + '&country=' + self.selectedCountry
        + '&region=' + self.selectedRegion + '&location=' + self.selectedSite + '&zone=' + self.selectedZone + '&subzone=' + self.selectedSubzone;
      var url = 'filter/waveexp' + queries;
      QueryService.query('GET', url, {}, {})
        .then(function(waveExpOptions) {
          self.waveExpOptions = waveExpOptions.data.message;
      });
    };

  }


})();
