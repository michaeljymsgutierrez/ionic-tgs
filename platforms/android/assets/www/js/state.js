// Configuration and States
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

	// Center Nav Title
	$ionicConfigProvider.navBar.alignTitle('center');

	// Initialization of States
	$stateProvider
	.state('settings',{
		cache: false,
		url:'/settings',
		templateUrl: 'templates/template-settings/settings.html',
		controller: 'mainCtrl'
	})
	.state('store',{
		cache: false,
		url: '/store',
		templateUrl: 'templates/template-settings/store-settings.html',
		controller: 'settingsCtrl'
	})
	.state('language',{
		cache: false,
		url: '/language',
		templateUrl: 'templates/template-settings/survey-language.html',
		controller: 'settingsCtrl'
	})
	.state('survey-home',{
		cache: false,
		url: '/survey/home',
		templateUrl: 'templates/template-settings/survey-settings-home.html',
		controller: 'settingsCtrl'
	})
	.state('payday-weekday',{
		cache: false,
		url: '/payday/weekday',
		templateUrl: 'templates/template-settings/survey-settings/payday-weekday.html',
		controller: 'settingsCtrl'
	})
	.state('nonpayday-weekday',{
		cache: false,
		url: '/nonpayday/weekday',
		templateUrl: 'templates/template-settings/survey-settings/nonpayday-weekday.html',
		controller: 'settingsCtrl'
	})
	.state('payday-weekend',{
		cache: false,
		url: '/payday/weekend',
		templateUrl: 'templates/template-settings/survey-settings/payday-weekend.html',
		controller: 'settingsCtrl'
	})	
	.state('nonpayday-weekend',{
		cache: false,
		url: '/nonpayday/weekend',
		templateUrl: 'templates/template-settings/survey-settings/nonpayday-weekend.html',
		controller: 'settingsCtrl'
	});

	$urlRouterProvider.otherwise('/settings');

	
});