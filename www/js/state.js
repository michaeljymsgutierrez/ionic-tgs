// Configuration and States
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

	// Center Nav Title
	$ionicConfigProvider.navBar.alignTitle('center');

	// Initialization of States
	$stateProvider
	.state('settings',{
		url:'/settings',
		templateUrl: 'templates/template-settings/settings.html',
		controller: 'mainCtrl'
	})
	.state('store',{
		cache: false,
		url: '/store',
		templateUrl: 'templates/template-settings/store-settings.html',
		controller: 'settingsCtrl'
	});

	$urlRouterProvider.otherwise('/store');

	
});