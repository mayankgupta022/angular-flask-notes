'use strict';

define(['angular', 'app'], function(angular, app) {

	document.url = "http://m-remember-me.appspot.com/";
	// document.url = "http://localhost:8080/";

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/notes', {
			templateUrl: 'app/tpl/noteList.html'
		});
		$routeProvider.when('/note/:noteId', {
			templateUrl: 'app/tpl/noteDetails.html',
			controller: 'NoteDetailsCtrl'
		});
		$routeProvider.otherwise({redirectTo: '/notes'});

	}]);

});
