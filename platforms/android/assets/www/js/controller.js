// Main Controller
// Consist of controllers on load at a time

app.controller('settingsLoadCtrl',function($scope, $cordovaSQLite, $ionicPlatform, $timeout, $state, $ionicSideMenuDelegate){

	//  On platform ready
	$ionicPlatform.ready(function(){
		
		// Disable side menu  
		$ionicSideMenuDelegate.canDragContent(false)

		// Initialize settings status object
		$scope.status_settings = { 
			store_settings:    0,
			survey_language:   0,
			payday_weekday:    0,
			nonpayday_weekday: 0,
			payday_weekend:    0,
			nonpayday_weekend: 0
		};

		$scope.showStartApp = false;

		// Check all table settings
		$cordovaSQLite.execute(db,'SELECT * FROM store_settings').then(function(res){
			$scope.status_settings.store_settings = res.rows.length; 		
		});

		$cordovaSQLite.execute(db,'SELECT * FROM survey_language').then(function(res){
			$scope.status_settings.survey_language = res.rows.length; 
		});

		$cordovaSQLite.execute(db,'SELECT * FROM payday_weekday').then(function(res){
			$scope.status_settings.payday_weekday = res.rows.length; 
		});

		$cordovaSQLite.execute(db,'SELECT * FROM non_payday_weekday').then(function(res){
			$scope.status_settings.nonpayday_weekday = res.rows.length; 
		});

		$cordovaSQLite.execute(db,'SELECT * FROM payday_weekend').then(function(res){
			$scope.status_settings.payday_weekend = res.rows.length;  
		});

		$cordovaSQLite.execute(db,'SELECT * FROM non_payday_weekend').then(function(res){
			$scope.status_settings.nonpayday_weekend = res.rows.length; 
		});

		$timeout(function(){
			if($scope.status_settings.store_settings == 1 && $scope.status_settings.survey_language == 1 && $scope.status_settings.payday_weekday == 1 && $scope.status_settings.nonpayday_weekday == 1 && $scope.status_settings.payday_weekend == 1 && $scope.status_settings.nonpayday_weekend == 1){
				$scope.showStartApp = true;
			}
			else{
				$scope.showStartApp = false;
			}
		},500);

		// Start Using the app
		$scope.startapp = function(){
			$state.go('app-home');
		}

	});

});