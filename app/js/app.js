var routeModule = angular.module('routeApp', [
  'ngRoute',
  'routeControllers'
]);

routeModule.config(['$routeProvider',
  function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'view1.html',
		controller: 'simpleRouteController'
	}).when('/view2', {
		templateUrl: 'view2.html',
		controller: 'simpleRouteController2'
		
	}).otherwise({
		redirectTo: '/'
	});
}]);

