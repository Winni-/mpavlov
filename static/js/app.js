'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.about',
  'myApp.contacts',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "parts/index.html",
		controller: "IndexCtrl"
	})
	.otherwise({
		template: "<h1>404</h1>"
	})
}])
.config(['$compileProvider',function( $compileProvider ){ 
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|skype):/) ;
}])
.controller("IndexCtrl",["$scope", "$http", "$timeout",function($scope, $http, $timeout) {
	$http.get('/v1/project')
	.then(function(response) {
		$timeout(function() {
		    $scope.projects = response.data;
	    	$scope.$apply();
	    	$scope.currentPage = 0;
		    $scope.pageSize = 5;
			$scope.prevPage = function() {
			    if ($scope.currentPage > 0) {
				    $scope.currentPage--;
			    }
		    };
		    $scope.prevPageDisabled = function() {
		        return $scope.currentPage === 0 ? true : false;
		    };
		    $scope.pageCount = function() {
		        return Math.ceil($scope.projects.length/$scope.pageSize)-1;
		    };
		    $scope.nextPage = function() {
		        if ($scope.currentPage < $scope.pageCount()) {
		            $scope.currentPage++;            
		        }
		    };
		    $scope.nextPageDisabled = function() {
		        return $scope.currentPage === $scope.pageCount() ? true : false;
		    };
		    $scope.setPage = function(page) {
		    	$scope.currentPage = page;
		    };
		    $scope.pages = [];
		    for (var i =  0; i <= $scope.pageCount(); i++) {
		    	$scope.pages.push({
		    		start: $scope.pageSize*i
		    	});
		    }; 	
		});	   
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    $scope.getdata = response
	});
	


}])
.controller("NavCtrl",['$location', '$scope', '$rootScope',function($location, $scope, $rootScope) {
	$scope.back = $location.$$path != "/";
	$rootScope.$on('$routeChangeStart', function(){
        $scope.back = $location.$$path != "/";
    });
}])
.filter('startFrom', function() {
    return function(input, start) {
    	if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});

$.material.init();