// Settings Controller
app.controller('settingsCtrl',function($scope, $ionicPopup, $rootScope, $cordovaSQLite, $location, Toast, $ionicPlatform, $state, $timeout){

	// Initialize store object for settings
	// rootScope  is used due to hiding of popup
	$rootScope.store_form = { };

	// Survey Language value on load
	$scope.survey_language = {
		value1: true,
		value2: false
	}

	// Platform ready code execution 
	$ionicPlatform.ready(function(){
			//  Load all current settings from db when state on store settings
			$cordovaSQLite.execute(db,"SELECT * FROM store_settings").then(function(res){
				if(res.rows.length != 0){
					data = res.rows.item(0);
					$rootScope.store_form.store_code = data.store_code;
					$rootScope.store_form.store_branch = data.store_branch;
					$rootScope.store_form.store_address = data.store_address;
					$rootScope.store_form.store_type = data.store_type;
					$rootScope.store_form.store_manager = data.store_manager;
				}
			},function(err){
				// Error fetching current store settings
				console.log(errr);
			});
	});
 
	// Popup show store type
	$scope.storeType =  function(){
		// Use rootScope for closing Custom Popup
		$rootScope.myPopup = $ionicPopup.show({
			title: '<p align="left" style="font-size: 100px !important"><font color="black">Store Type</font></p>',
			scope: $scope,
			templateUrl: 'templates/template-settings/store-type.html'
		});
	};

	// Popup Hide Object function
	$scope.closeStoreType = {
		cancel: function(){
			$rootScope.myPopup.close();
		},
		okay: function(store_type){
			$rootScope.store_form.store_type = store_type;
			$rootScope.myPopup.close();
		}
	};

	// Insert-Update function for store settings
	$scope.save_store_settings = function(){
		if($rootScope.store_form.store_code == undefined || $rootScope.store_form.store_branch == undefined || $rootScope.store_form.store_address == undefined || $rootScope.store_form.store_type == undefined || $rootScope.store_form.store_manager == undefined){
			// 
			Toast.show("Please fill up all fields before saving . . .","long","center");
		}
		else if($rootScope.store_form.store_code == "" || $rootScope.store_form.store_branch == "" || $rootScope.store_form.store_address == "" || $rootScope.store_form.store_type == "" || $rootScope.store_form.store_manager == ""){
			Toast.show("Please fill up all fields before saving . . .","long","center");
		}
		else{
			$cordovaSQLite.execute(db,'SELECT * FROM store_settings').then(function(res){
				if(res.rows.length == 0){
					// Insert store settings if table item length is 1
					$cordovaSQLite.execute(db,'INSERT INTO store_settings (store_code, store_branch, store_address, store_type, store_manager) VALUES (?,?,?,?,?)',
					[$rootScope.store_form.store_code, $rootScope.store_form.store_branch, $rootScope.store_form.store_address, $rootScope.store_form.store_type, $rootScope.store_form.store_manager])
					.then(function(res){
						Toast.show("Store settings successfully saved . . .","long","center");
						$timeout(function(){
							$state.go('settings');
						},3000);
						console.log(res);
					},function(err){
						// Error inserting on table
						console.log(err);
					});
				}
				else{
					// Update store settings when table item length is 0
					id = res.rows.item(0).id;
					$cordovaSQLite.execute(db,"UPDATE store_settings SET store_code = ?, store_branch = ?, store_address = ?, store_type = ?, store_manager = ? WHERE id = ?",
					[$rootScope.store_form.store_code, $rootScope.store_form.store_branch, $rootScope.store_form.store_address, $rootScope.store_form.store_type, $rootScope.store_form.store_manager,id])
					.then(function(res){
						Toast.show("Store settings successfully updated . . .","long","center");
						$timeout(function(){
							$state.go('settings');
						},3000);
						console.log(res);
					},function(err){
						// Error updating table
						console.log(err);
					});
				}
			},function(err){ 
				// Error checking store settings table
				console.log(err); 
			});
		};
	}

	// Survey Language Function
	$scope.select_language = function(data){
		// Condition fo switching checkbox
		if(data == "English"){
			$scope.survey_language.value1 = true;
			$scope.survey_language.value2 = false;
		}
		else if(data == "Tagalog"){
			$scope.survey_language.value1 = false;
			$scope.survey_language.value2 = true;
		}
		// Save and Update language type
		$cordovaSQLite.execute(db,"SELECT * FROM survey_language").then(function(res){
			if(res.rows.length == 0){
				$cordovaSQLite.execute(db,"INSERT INTO survey_language (language) VALUES (?)",[data])
				.then(function(res){
					Toast.show("Successfully saved language type . . .","long","center");
					console.log(res);
				},function(err){
					// Error insert data
					console.log(err);
				});
			}
			else{
				id = res.rows.item(0).id;
				$cordovaSQLite.execute(db,"UPDATE survey_language SET language = ? WHERE id = ?",[data, id])
				.then(function(res){
					Toast.show("Successfully updated language type . . .","long","center");
					console.log(res);
				},function(err){
					// Error update data
					console.log(err);
				});
			}

		},function(err){
			// Error fetching data survey language
			console.log(err);
		});

	};

});