// Configuration and States
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

	// Center Nav Title
	$ionicConfigProvider.navBar.alignTitle('center');

	// Initialization of States
	$stateProvider
	.state('settings',{
		url:'/settings',
		templateUrl: 'templates/settings.html',
		controller: 'mainCtrl'
	});

	$urlRouterProvider.otherwise('/settings');

	
});