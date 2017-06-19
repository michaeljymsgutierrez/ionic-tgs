// Settings Controller
app.controller('settingsCtrl',function($scope, $ionicPopup, $rootScope){

	// Popup show store type
	$scope.storeType =  function(){
		// Use rootScope for closing Custom Popup
		$rootScope.myPopup = $ionicPopup.show({
			title: '<p align="left" style="font-size: 100px !important"><font color="black">Store Type</font></p>',
			templateUrl: 'templates/template-settings/store-type.html'
		});
	};

	// Popup Hide Object function
	$scope.closeStoreType = {
		cancel: function(){
			$rootScope.myPopup.close();
		},
		okay: function(){
			$rootScope.myPopup.close();
		}
	};


});