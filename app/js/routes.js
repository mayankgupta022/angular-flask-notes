'use strict';

define(['angular', 'app'], function(angular, app) {

	document.url = "http://localhost/rememberMe/";

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/notes', {
			templateUrl: 'app/tpl/noteList.html',
			controller: 'NoteListCtrl'
		});
		$routeProvider.when('/note/:noteId', {
			templateUrl: 'app/tpl/noteDetails.html',
			controller: 'NoteDetailsCtrl'
		});
		$routeProvider.otherwise({redirectTo: '/notes'});

	}]);

});
