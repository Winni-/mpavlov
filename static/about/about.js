'use strict';

angular.module('myApp.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'about/index.html',
    controller: 'AboutCtrl'
  });
}])

.controller('AboutCtrl', ["$http", "$scope", "$timeout", function($http, $scope, $timeout) {
	$http.get('/v1/history')
	.then(function(response) {
		$timeout(function() {
		    $scope.history = response.data;
	    	$scope.$apply();	    	
		});	   
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    $scope.getdata = response
	});
}]);