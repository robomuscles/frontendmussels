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


    /**
     * Load some data
     * @return {Object} Returned object
     */
    QueryService.query('GET', 'filter/biomimic', {}, {})
      .then(function(biomimicOptions) {
        self.biomimicOptions = biomimicOptions.data.message;
    });

    self.selectedBiomimic = undefined;

  }


})();
