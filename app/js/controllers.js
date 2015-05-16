'use strict';

define(['angular', 'services'], function (angular) {

	/* Controllers */
	
	return angular.module('myApp.controllers', ['myApp.services'])

		.controller('NoteListCtrl', ['$scope', '$http', function ($scope, $http) {

				$http.get(document.url + 'notes').
				success(function(data, status, headers, config) {
					$scope.notes = data.data;
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		}])

		.controller('NoteDetailsCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
			console.log($routeParams.noteId);
			if($routeParams.noteId != 'new')
				$http.get(document.url + 'note/' + $routeParams.noteId).
					success(function(data, status, headers, config) {
						$scope.note = data.data;
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});

			$scope.saveNote = function() {
				var url
				if($routeParams.noteId == 'new')
					url = document.url + 'newNote';
				else
					url = document.url + 'saveNote';

				console.log($scope.note);
				$http.post(url, $scope.note).
					success(function(data, status, headers, config) {
						$scope.notes = data;
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});
			};

			$scope.deleteNote = function() {
				$http.post(document.url + 'delNote/' + $routeParams.noteId, $scope.note).
					success(function(data, status, headers, config) {
						$scope.notes = data;
					}).
					error(function(data, status, headers, config) {
						console.log(data);
					});
			};
		}]);
});
