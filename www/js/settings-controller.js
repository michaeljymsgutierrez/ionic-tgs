// Settings Controller
app.controller('settingsCtrl',function($scope, $ionicPopup, $rootScope, $cordovaSQLite, $location, Toast, $ionicPlatform, $state, $timeout, dateFormatter){

	// Initialize store object for settings
	// rootScope  is used due to hiding of popup
	$rootScope.store_form = { };

	// Survey Language value on load
	$scope.survey_language = {
		value1: true,
		value2: false
	}

	// Initialize payday week day object
	$scope.payday_weekday = { };

	// Initialize non payday week day object
	$scope.nonpayday_weekday = { };

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

			//  Load current survey language settings from db when state on survey language
			$cordovaSQLite.execute(db,"SELECT * FROM  survey_language").then(function(res){
				if(res.rows.length != 0){
					if(res.rows.item(0).language == "English"){
						$scope.survey_language = {
							value1: true,
							value2: false
						}
					}
					else if(res.rows.item(0).language == "Tagalog"){
						$scope.survey_language = {
							value1: false,
							value2: true
						}
					}
				}
			},function(err){
				// Error fetching current survey language
				console.log(err);
			});

			// Load current payday weekday settings schedule
			$cordovaSQLite.execute(db,"SELECT * FROM payday_weekday").then(function(res){
				if(res.rows.length != 0){
					data = res.rows.item(0);
					$scope.payday_weekday.date = new Date(data.payday_weekday_date);
					$scope.payday_weekday.start = new Date(data.payday_weekday_start);
					$scope.payday_weekday.end =  new Date(data.payday_weekday_end);
				}
			},function(err){
				// Error fetching current payday weekday schedule
				console.log(err);
			});

			// Load current payday weekday settings schedule
			$cordovaSQLite.execute(db,"SELECT * FROM non_payday_weekday").then(function(res){
				if(res.rows.length != 0){
					data = res.rows.item(0);
					$scope.nonpayday_weekday.date = new Date(data.non_payday_weekday_date);
					$scope.nonpayday_weekday.start = new Date(data.non_payday_weekday_start);
					$scope.nonpayday_weekday.end =  new Date(data.non_payday_weekday_end);
				}
			},function(err){
				// Error fetching current payday weekday schedule
				console.log(err);
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

	// Payday weekday function
	$scope.save_payday_weekday = function(){
		if($scope.payday_weekday.date == "" || $scope.payday_weekday.date == undefined || $scope.payday_weekday.start == "" || $scope.payday_weekday.start == undefined || $scope.payday_weekday.end == "" || $scope.payday_weekday.end == undefined ){
			Toast.show("Please set all fields before saving . . .","long","center");
		}
		else{
			// Validate if starts time > ends time
			if(dateFormatter.toTimestamp($scope.payday_weekday + " " + $scope.payday_weekday.start) >= dateFormatter.toTimestamp($scope.payday_weekday + " " + $scope.payday_weekday.end)){
				Toast.show("Please set all fields correctly before saving . . .","long","center");
			}
			else{
				$cordovaSQLite.execute(db,'SELECT * FROM payday_weekday').then(function(res){
					if(res.rows.length == 0){
						$cordovaSQLite.execute(db,"INSERT INTO payday_weekday (payday_weekday_date, payday_weekday_start, payday_weekday_end) VALUES (?,?,?)",
							[dateFormatter.toStandard($scope.payday_weekday.date), dateFormatter.toStandard($scope.payday_weekday.start), dateFormatter.toStandard($scope.payday_weekday.end)])
							.then(function(res){
								Toast.show("Successfully saved Payday Weekday schedule . . .","long","center");
								$timeout(function(){
									$state.go('survey-home');
								},3000);
							},function(err){
								// Error insert data
								console.log(err);
							});
					}
					else{
						id = res.rows.item(0).id;
						$cordovaSQLite.execute(db,"UPDATE payday_weekday SET payday_weekday_date = ?, payday_weekday_start = ?, payday_weekday_end = ? WHERE id = ?",
							[dateFormatter.toStandard($scope.payday_weekday.date), dateFormatter.toStandard($scope.payday_weekday.start), dateFormatter.toStandard($scope.payday_weekday.end), id])
							.then(function(res){
								Toast.show("Successfully updated Payday Weekday schedule . . .","long","center");
								$timeout(function(){
									$state.go('survey-home');
								},3000);
							},function(err){
								// Error update data
								console.log(err);
							});
					}
				},function(err){
					// Error fetching data from payday weekday
					console.log(err);
				});

			}

		}
	};


	// Non Payday weekday function
	$scope.save_nonpayday_weekday = function(){
		if($scope.nonpayday_weekday.date == "" || $scope.nonpayday_weekday.date == undefined || $scope.nonpayday_weekday.start == "" || $scope.nonpayday_weekday.start == undefined || $scope.nonpayday_weekday.end == "" || $scope.nonpayday_weekday.end == undefined ){
			Toast.show("Please set all fields before saving . . .","long","center");
		}
		else{
			// Validate if starts time > ends time
			if(dateFormatter.toTimestamp($scope.nonpayday_weekday + " " + $scope.nonpayday_weekday.start) >= dateFormatter.toTimestamp($scope.nonpayday_weekday + " " + $scope.nonpayday_weekday.end)){
				Toast.show("Please set all fields correctly before saving . . .","long","center");
			}
			else{
				$cordovaSQLite.execute(db,'SELECT * FROM non_payday_weekday').then(function(res){
					if(res.rows.length == 0){
						$cordovaSQLite.execute(db,"INSERT INTO non_payday_weekday (non_payday_weekday_date, non_payday_weekday_start, non_payday_weekday_end) VALUES (?,?,?)",
							[dateFormatter.toStandard($scope.nonpayday_weekday.date), dateFormatter.toStandard($scope.nonpayday_weekday.start), dateFormatter.toStandard($scope.nonpayday_weekday.end)])
							.then(function(res){
								Toast.show("Successfully saved Non Payday Weekday schedule . . .","long","center");
								$timeout(function(){
									$state.go('survey-home');
								},3000);
							},function(err){
								// Error insert data
								console.log(err);
							});
					}
					else{
						id = res.rows.item(0).id;
						$cordovaSQLite.execute(db,"UPDATE non_payday_weekday SET non_payday_weekday_date = ?, non_payday_weekday_start = ?, non_payday_weekday_end = ? WHERE id = ?",
							[dateFormatter.toStandard($scope.nonpayday_weekday.date), dateFormatter.toStandard($scope.nonpayday_weekday.start), dateFormatter.toStandard($scope.nonpayday_weekday.end), id])
							.then(function(res){
								Toast.show("Successfully updated Non Payday Weekday schedule . . .","long","center");
								$timeout(function(){
									$state.go('survey-home');
								},3000);
							},function(err){
								// Error update data
								console.log(err);
							});
					}
				},function(err){
					// Error fetching data from payday weekday
					console.log(err);
				});

			}

		}
	};

});