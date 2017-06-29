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

	// Initialize payday weekday object
	$scope.payday_weekday = { };

	// Initialize non payday weekday object
	$scope.nonpayday_weekday = { };

	// Initialize payday weekend object
	$scope.payday_weekend = { };

	// Initialize non payday weekend object
	$scope.nonpayday_weekend = { };

	// Initialize main display survey settings schedule
	$scope.summary_schedule = { };

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
					$scope.summary_schedule.pwd = dateFormatter.summarize($scope.payday_weekday.date, $scope.payday_weekday.start, $scope.payday_weekday.end);
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
					$scope.summary_schedule.npwd = dateFormatter.summarize($scope.nonpayday_weekday.date, $scope.nonpayday_weekday.start, $scope.nonpayday_weekday.end);
				}
			},function(err){
				// Error fetching current payday weekday schedule
				console.log(err);
			});


			// Load current payday weekdend settings schedule
			$cordovaSQLite.execute(db,"SELECT * FROM payday_weekend").then(function(res){
				if(res.rows.length != 0){
					data = res.rows.item(0);
					$scope.payday_weekend.date = new Date(data.payday_weekend_date);
					$scope.payday_weekend.start = new Date(data.payday_weekend_start);
					$scope.payday_weekend.end =  new Date(data.payday_weekend_end);
					$scope.summary_schedule.pwe = dateFormatter.summarize($scope.payday_weekend.date, $scope.payday_weekend.start, $scope.payday_weekend.end );
				}
			},function(err){
				// Error fetching current payday weekday schedule
				console.log(err);
			});


			// Load current nonpayday weekdend settings schedule
			$cordovaSQLite.execute(db,"SELECT * FROM non_payday_weekend").then(function(res){
				if(res.rows.length != 0){
					data = res.rows.item(0);
					$scope.nonpayday_weekend.date = new Date(data.non_payday_weekend_date);
					$scope.nonpayday_weekend.start = new Date(data.non_payday_weekend_start);
					$scope.nonpayday_weekend.end =  new Date(data.non_payday_weekend_end);
					$scope.summary_schedule.npwe = dateFormatter.summarize($scope.nonpayday_weekend.date, $scope.nonpayday_weekend.start, $scope.nonpayday_weekend.end);
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

		var schedule = {
			pwd: dateFormatter.toDate($scope.payday_weekday.date),
			npwd: dateFormatter.toDate($scope.nonpayday_weekday.date),
			pwe: dateFormatter.toDate($scope.payday_weekend.date),
			npwe: dateFormatter.toDate($scope.nonpayday_weekend.date),
			day: new Date($scope.payday_weekday.date).getDay()
		}

		if($scope.payday_weekday.date == "" || $scope.payday_weekday.date == undefined || $scope.payday_weekday.start == "" || $scope.payday_weekday.start == undefined || $scope.payday_weekday.end == "" || $scope.payday_weekday.end == undefined ){
			Toast.show("Please set all fields before saving . . .","long","center");
		}
		else if(schedule.pwd == schedule.npwd || schedule.pwd == schedule.pwe || schedule.pwd == schedule.npwe){
			Toast.show("Please choose another schedule . . .","long","center");
		}
		else if(schedule.day < 1 || schedule.day > 5){
			Toast.show("Please choose weekdays schedule only . . .","long","center");
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

		var schedule = {
			pwd: dateFormatter.toDate($scope.payday_weekday.date),
			npwd: dateFormatter.toDate($scope.nonpayday_weekday.date),
			pwe: dateFormatter.toDate($scope.payday_weekend.date),
			npwe: dateFormatter.toDate($scope.nonpayday_weekend.date),
			day: new Date($scope.nonpayday_weekday.date).getDay()
		}

		if($scope.nonpayday_weekday.date == "" || $scope.nonpayday_weekday.date == undefined || $scope.nonpayday_weekday.start == "" || $scope.nonpayday_weekday.start == undefined || $scope.nonpayday_weekday.end == "" || $scope.nonpayday_weekday.end == undefined ){
			Toast.show("Please set all fields before saving . . .","long","center");
		}
		else if(schedule.npwd == schedule.pwd || schedule.npwd == schedule.pwe || schedule.npwd == schedule.npwe){
			Toast.show("Please choose another schedule . . .","long","center");
		}
		else if(schedule.day < 1 || schedule.day > 5){
			Toast.show("Please choose weekdays schedule only . . .","long","center");
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


	// Payday weekend function
	$scope.save_payday_weekend = function(){

		var schedule = {
			pwd: dateFormatter.toDate($scope.payday_weekday.date),
			npwd: dateFormatter.toDate($scope.nonpayday_weekday.date),
			pwe: dateFormatter.toDate($scope.payday_weekend.date),
			npwe: dateFormatter.toDate($scope.nonpayday_weekend.date),
			day: new Date($scope.payday_weekend.date).getDay()
		}

		if($scope.payday_weekend.date == "" || $scope.payday_weekend.date == undefined || $scope.payday_weekend.start == "" || $scope.payday_weekend.start == undefined || $scope.payday_weekend.end == "" || $scope.payday_weekend.end == undefined ){
			Toast.show("Please set all fields before saving . . .","long","center");
		}
		else if(schedule.pwe == schedule.pwd || schedule.pwe == schedule.npwd || schedule.pwe == schedule.npwe){
			Toast.show("Please choose another schedule . . .","long","center");
		}
		else if(schedule.day != 0 || schedule.day == 6){
			Toast.show("Please choose weekends schedule only . . .","long","center");
		}
		else{
			// Validate if starts time > ends time
			if(dateFormatter.toTimestamp($scope.payday_weekend + " " + $scope.payday_weekend.start) >= dateFormatter.toTimestamp($scope.payday_weekend + " " + $scope.payday_weekend.end)){
				Toast.show("Please set all fields correctly before saving . . .","long","center");
			}
			else{
				$cordovaSQLite.execute(db,'SELECT * FROM payday_weekend').then(function(res){
					if(res.rows.length == 0){
						$cordovaSQLite.execute(db,"INSERT INTO payday_weekend (payday_weekend_date, payday_weekend_start, payday_weekend_end) VALUES (?,?,?)",
							[dateFormatter.toStandard($scope.payday_weekend.date), dateFormatter.toStandard($scope.payday_weekend.start), dateFormatter.toStandard($scope.payday_weekend.end)])
							.then(function(res){
								Toast.show("Successfully saved Payday Weekend schedule . . .","long","center");
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
						$cordovaSQLite.execute(db,"UPDATE payday_weekend SET payday_weekend_date = ?, payday_weekend_start = ?, payday_weekend_end = ? WHERE id = ?",
							[dateFormatter.toStandard($scope.payday_weekend.date), dateFormatter.toStandard($scope.payday_weekend.start), dateFormatter.toStandard($scope.payday_weekend.end), id])
							.then(function(res){
								Toast.show("Successfully updated Payday Weekend schedule . . .","long","center");
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



	// Non Payday weekend function
	$scope.save_nonpayday_weekend = function(){
		if($scope.nonpayday_weekend.date == "" || $scope.nonpayday_weekend.date == undefined || $scope.nonpayday_weekend.start == "" || $scope.nonpayday_weekend.start == undefined || $scope.nonpayday_weekend.end == "" || $scope.nonpayday_weekend.end == undefined ){
			Toast.show("Please set all fields before saving . . .","long","center");
		}
		else{
			// Validate if starts time > ends time
			if(dateFormatter.toTimestamp($scope.nonpayday_weekend + " " + $scope.nonpayday_weekend.start) >= dateFormatter.toTimestamp($scope.nonpayday_weekend + " " + $scope.nonpayday_weekend.end)){
				Toast.show("Please set all fields correctly before saving . . .","long","center");
			}
			else{
				$cordovaSQLite.execute(db,'SELECT * FROM non_payday_weekend').then(function(res){
					if(res.rows.length == 0){
						$cordovaSQLite.execute(db,"INSERT INTO non_payday_weekend (non_payday_weekend_date, non_payday_weekend_start, non_payday_weekend_end) VALUES (?,?,?)",
							[dateFormatter.toStandard($scope.nonpayday_weekend.date), dateFormatter.toStandard($scope.nonpayday_weekend.start), dateFormatter.toStandard($scope.nonpayday_weekend.end)])
							.then(function(res){
								Toast.show("Successfully saved Non Payday Weekend schedule . . .","long","center");
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
						$cordovaSQLite.execute(db,"UPDATE non_payday_weekend SET non_payday_weekend_date = ?, non_payday_weekend_start = ?, non_payday_weekend_end = ? WHERE id = ?",
							[dateFormatter.toStandard($scope.nonpayday_weekend.date), dateFormatter.toStandard($scope.nonpayday_weekend.start), dateFormatter.toStandard($scope.nonpayday_weekend.end), id])
							.then(function(res){
								Toast.show("Successfully updated Non Payday Weekend schedule . . .","long","center");
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