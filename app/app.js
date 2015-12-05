/**
 *
 * RoboMussels Front End
 * @description           Description
 * @author                Group 6 // github.com/robomuscles
 * @url                   github.com/robomuscles
 * @version               1.0
 * @date                  December 2016
 * @license               MIT
 *
 */
 
;(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('boilerplate', [
      'ngRoute',
      'ui.bootstrap',
      'ui.select',
      'ngSanitize',
      'ng-bootstrap-datepicker'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
      })
      // .when('/results/:biomimic/:country/:region/:site/:zone/:subzone/:wavexp/:startDate/:endDate', {
      //   templateUrl: 'views/results.html',
      //   controller: 'ResultsController'
      // })
      .when('/results/:biomimic/:country/:region/:site/:zone/:subzone/:startDate/:endDate/:waveexp?', {
        templateUrl: 'views/results.html',
        controller: 'ResultsController'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('authInterceptor');

  }


  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   *
   */
  angular
    .module('boilerplate')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }


  /**
   * Run block
   */
  angular
    .module('boilerplate')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // put here everything that you need to run on page load

  }


})();
