// Main Controller
// Consist of controllers on load at a time

app.controller('settingsLoadCtrl',function($scope, $rootScope, $cordovaSQLite, $ionicPlatform, $timeout, $state, $ionicSideMenuDelegate, $window, storage, $ionicPopup, $ionicLoading){
	
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

		// Function for Hide pop up for reset
		$rootScope.hideMe = function(){
			$rootScope.resetPopup.close();
		};

		// Function for Reset application
		$rootScope.resetApp = function(){
			$window.localStorage.clear();
			$cordovaSQLite.execute(db,"DELETE FROM survey_data");
			$cordovaSQLite.execute(db,"DELETE FROM store_settings");
			$cordovaSQLite.execute(db,"DELETE FROM survey_language");
			$cordovaSQLite.execute(db,"DELETE FROM payday_weekday");
			$cordovaSQLite.execute(db,"DELETE FROM non_payday_weekday");
			$cordovaSQLite.execute(db,"DELETE FROM payday_weekend");
			$cordovaSQLite.execute(db,"DELETE FROM non_payday_weekend");
	        $ionicLoading.show({
	              template: '<ion-spinner icon="ios-small"></ion-spinner></br><span style="color:#FFFFFF !important;">Please wait while resetting data . . .<span>',
	              showBackDrop: false,
	              duration: 6000
	        });

	        $timeout(function(){
	          	$rootScope.hideMe();
	          	$state.go('settings');
	          	$state.reload();
	        },6000);

		}

		// Function for reset settings
		$scope.reset = function(){	
			$cordovaSQLite.execute(db,"SELECT * FROM survey_data WHERE is_synced = 0")
			.then(function(res){
				if(res.rows.length > 0){
						// Prompt if  data there are unsynced data
						$rootScope.resetPopup = $ionicPopup.show({
							title: '<p align="center" style="font-weight:bold;"><font size="4" color="#024c1d">Reset Settings ?</font></p>',
							scope: $scope,
							template: '<p align="center" style="font-size: 15px;">You must first sync all the data before you can reset the application <br/><br/> <a class="button button-clear oKonly" ng-click="hideMe()">OK</a></p>'
						});
				}
				else if(res.rows.length  == 0){
						// Prompt if there are no data to sync
						$rootScope.resetPopup = $ionicPopup.show({
							title: '<p align="center" style="font-weight:bold;"><font size="4" color="#024c1d">Reset Settings ?</font></p>',
							scope: $scope,
							template: '<p align="center" style="font-size: 15px;">Are you sure you want to reset application? <br/><br/> <a class="button button-clear no" ng-click="hideMe()">NO</a> <a  class="button button-clear yes" ng-click="resetApp()">YES</a></p>'
						});
				}

			},function(err){
				// Error Log
				console.log(err);
			});
		}

	});

});