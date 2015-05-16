'use strict';

define(['angular', 'services'], function (angular) {

	/* Controllers */
	
	return angular.module('myApp.controllers', ['myApp.services'])
		// Sample controller where service is being used
		.controller('NoteListCtrl', ['$scope', '$http', function ($scope, $http) {

				$http.get(document.url + 'notes.json').
				success(function(data, status, headers, config) {
					$scope.notes = data;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		}])
		// More involved example where controller is required from an external file
		.controller('NoteDetailsCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
			console.log($routeParams.noteId);
			if($routeParams.noteId != 'new')
				$http.get(document.url + 'note/' + $routeParams.noteId + '.json').
					success(function(data, status, headers, config) {
						$scope.notes = data;
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});

			$scope.saveNote = function() {
				$http.post(document.url + 'note/' + $routeParams.noteId + '.json', $scope.note).
					success(function(data, status, headers, config) {
						$scope.notes = data;
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});
			};

			$scope.deleteNote = function() {
				$http.post(document.url + 'delNote/' + $routeParams.noteId + '.json', $scope.note).
					success(function(data, status, headers, config) {
						$scope.notes = data;
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});
			};
		}]);
});
