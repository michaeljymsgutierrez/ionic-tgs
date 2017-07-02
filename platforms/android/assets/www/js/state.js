// Configuration and States
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

	// Center Nav Title
	$ionicConfigProvider.navBar.alignTitle('center');
	// Remove slide animation of views
	$ionicConfigProvider.views.transition('none');

	// Initialization of States
	$stateProvider
	.state('settings',{
		cache: false,
		url:'/settings',
		templateUrl: 'templates/template-settings/settings.html',
		controller: 'settingsLoadCtrl'
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
	})
	.state('app-home',{
		cache: false,
		url: '/app-home',
		templateUrl: 'templates/template-survey/app-home.html',
		controller: 'surveyCtrl'
	})
	.state('survey-landing',{
		cache: false,
		url: '/survey-landing',
		templateUrl: 'templates/template-survey/survey-landing-page.html',
		controller: 'surveyCtrl'
	})
	.state('survey-page1',{
		cache: false,
		url: '/survey-page1',
		templateUrl: 'templates/template-survey/survey-page1.html',
		controller: 'surveyCtrl'
	})
	.state('survey-page2',{
		cache: false,
		url: '/survey-page2',
		templateUrl: 'templates/template-survey/survey-page2.html',
		controller: 'surveyCtrl'
	})
	.state('survey-page3',{
		cache: false,
		url: '/survey-page3',
		templateUrl: 'templates/template-survey/survey-page3.html',
		controller: 'surveyCtrl'
	})
	.state('mall-survey-a',{
		cache: false,
		url: '/mall-survey-a',
		templateUrl: 'templates/template-survey/mall-survey-a.html',
		controller: 'surveyCtrl'
	})
	.state('mall-survey-b',{
		cache: false,
		url: '/mall-survey-b',
		templateUrl: 'templates/template-survey/mall-survey-b.html',
		controller: 'surveyCtrl'
	})
	.state('personal-info',{
		cache: false,
		url: '/personal-info',
		templateUrl: 'templates/template-survey/personal-information.html',
		controller: 'surveyCtrl'
	})
	.state('instore-survey-a',{
		cache: false,
		url: '/instore-survey-a',
		templateUrl: 'templates/template-survey/instore-survey-a.html',
		controller: 'surveyCtrl'
	})
	.state('instore-survey-b',{
		cache: false,
		url: '/instore-survey-b',
		templateUrl: 'templates/template-survey/instore-survey-b.html',
		controller: 'surveyCtrl'
	})
	.state('survey-thankyou',{
		cache: false,
		url: '/survey-thankyou',
		templateUrl: 'templates/template-survey/survey-thankyou.html',
		controller: 'surveyCtrl'
	})
	.state('survey-sync',{
		cache: false,
		url: '/survey-sync',
		templateUrl: 'templates/template-survey/survey-sync.html',
		controller: 'surveyCtrl'
	});

	$urlRouterProvider.otherwise('/settings');

	
});