angular.module('MyApp', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService', 'storyCtrl', 'StoryService', 'reverseDirective'])


	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});