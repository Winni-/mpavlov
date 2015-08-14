'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('adminApp', [
  'ngRoute',
  'myApp.version'
]);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "parts/adminindex.html",
		controller: "mainCtrl",
		controllerAs: "ctrl"
	})
	.otherwise({
		template: "<h1>404</h1>"
	})
}]);

app.controller("mainCtrl",function($scope, $http, $timeout) {
	this.project = {};	
	var fr;
	$scope.fileNameChanged = function() {
		var file = $("#img-input")[0].files[0];
	    fr = new FileReader();
	    fr.onload = receivedText;	    
	    fr.readAsDataURL(file);
	};
	function receivedText() {  
        $('#editor').text(fr.result);
    }
	this.addProject = function(project) {
		project.image = $('#editor').text();
		$scope.projects.push(project);
		$http({
			method: "post",
			url: "http://localhost:1337/v1/project",
			data: project
		}).then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || "Request failed";
          $scope.status = response.status;
      	});      	
	};

	$http.get('http://localhost:1337/v1/project')
	.then(function(response) {
		$timeout(function() {
		    $scope.projects = response.data;
	    	$scope.$apply();	    	
		});	   
	}, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    $scope.getdata = response
	});

	$scope.removeP = function(id, index) {		
		$http.delete("http://localhost:1337/v1/project/"+id);
		$scope.projects.splice(index, 1);		
	};
	$scope.update = function($event, id, index) {
		//console.log($event);
		//TODO
	};

	this.addStory = function(story) {
		console.log(story);		
		$scope.history.push(story);
		$http({
			method: "post",
			url: "http://localhost:1337/v1/history",
			data: story
		}).then(function(response) {
          //ok
        }, function(response) {
          //fail
      	});      	
	};
	$http.get('http://localhost:1337/v1/history')
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
	$scope.removeS = function(id, index) {		
		$http.delete("http://localhost:1337/v1/history/"+id);
		$scope.history.splice(index, 1);		
	};
	$scope.update = function($event, id, index) {
		//console.log($event);
		//TODO
	};

	this.addContact = function(contact) {		
		console.log(contact);
		$scope.contacts.push(contact);
		$http({
			method: "post",
			url: "http://localhost:1337/v1/contacts",
			data: contact
		}).then(function(response) {
          //ok
        }, function(response) {
          //fail
      	});      	
	};

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

	$scope.removeC = function(id, index) {		
		$http.delete("http://localhost:1337/v1/contacts/"+id);
		$scope.contacts.splice(index, 1);		
	};
	$scope.update = function($event, id, index) {
		//console.log($event);
		//TODO
	};
		
})
.controller("NavCtrl",['$location', '$scope', '$rootScope',function($location, $scope, $rootScope) {
	$scope.back = $location.$$path != "/";
	$rootScope.$on('$routeChangeStart', function(){
        $scope.back = $location.$$path != "/";
    });
}]);;


$.material.init();
