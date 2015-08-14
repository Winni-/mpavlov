'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/index.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ["$http", "$scope", "$timeout", function($http, $scope, $timeout) {
	$http.get('http://localhost:1337/v1/contacts')
	.then(function(response) {
		$timeout(function() {
		    $scope.contacts = response.data;
	    	$scope.$apply();	    	
		});	   
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    $scope.getdata = response
	});
}]);