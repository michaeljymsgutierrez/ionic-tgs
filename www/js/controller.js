// Main Controller
// Consist of controllers on load at a time

app.controller('settingsLoadCtrl',function($scope, $rootScope, $cordovaSQLite, $ionicPlatform, $timeout, $state, $ionicSideMenuDelegate, $window, storage){
	
	//  On platform ready
	$ionicPlatform.ready(function(){

		// Get data to update the sidebar
		$timeout(function(){
			$rootScope.store_name = storage.read('store_name');
			$rootScope.store_type = storage.read('store_type');
			$rootScope.showBurgerIcon = storage.read('showBurger');
		},1000);

		// Show reset button 
		$rootScope.showReset = storage.read('showReset');

		// Toggle Sidemenu on survey controller
		$rootScope.toggleLeft = function(){
	        $ionicSideMenuDelegate.toggleLeft();
	    };


		// Disable side menu  
		$ionicSideMenuDelegate.canDragContent(false);

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
			if(res.rows.length != 0){
				$window.localStorage.setItem('store_name',res.rows.item(0).store_branch);
				$window.localStorage.setItem('store_code',res.rows.item(0).store_code);
				$window.localStorage.setItem('store_type',res.rows.item(0).store_type);
				$window.localStorage.setItem('store_manager',res.rows.item(0).store_manager);
				$window.localStorage.setItem('store_address',res.rows.item(0).store_address);
			}
		});

		$cordovaSQLite.execute(db,'SELECT * FROM survey_language').then(function(res){
			$scope.status_settings.survey_language = res.rows.length; 
			if(res.rows.length != 0){
				$window.localStorage.setItem('language',res.rows.item(0).language);
			}
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
		
		// Check status of show start up btn
		if(storage.read('showStartAppBtn') == "false"){
			// Write false show start up btn false
			$scope.showStartApp = false;
			storage.write('showBurger',true);
		}
		else{ 
			$timeout(function(){
				if($scope.status_settings.store_settings == 1 && $scope.status_settings.survey_language == 1 && $scope.status_settings.payday_weekday == 1 && $scope.status_settings.nonpayday_weekday == 1 && $scope.status_settings.payday_weekend == 1 && $scope.status_settings.nonpayday_weekend == 1){
					$scope.showStartApp = true;
				}
				else{
					$scope.showStartApp = false;
				}
			},500);
		}

		// Start Using the app btn
		$scope.startapp = function(){
			// Write status for reset  and show start up btn
			storage.write('skipSetup','true');
			storage.write('showReset','true');
			storage.write('showStartAppBtn','false');
			$state.go('app-home');
		}

	});

});