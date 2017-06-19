// Settings Controller
app.controller('settingsCtrl',function($scope, $ionicPopup, $rootScope, $cordovaSQLite, $location, Toast){

	// Initialize store object for settings
	// rootScope  is used due to hiding of popup
	$rootScope.store_form = { };
 
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
		else{
			$cordovaSQLite.execute(db,'SELECT * FROM store_settings').then(function(res){
				if(res.rows.length == 0){
					// Insert store settings if table item length is 1
					$cordovaSQLite.execute(db,'INSERT INTO store_settings (store_code, store_branch, store_address, store_type, store_manager) VALUES (?,?,?,?,?)',
					[$rootScope.store_form.store_code, $rootScope.store_form.store_branch, $rootScope.store_form.store_address, $rootScope.store_form.store_type, $rootScope.store_form.store_manager])
					.then(function(res){
						Toast.show("Store settings successfully saved . . .","long","center");
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

});