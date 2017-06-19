// Settings Controller
app.controller('settingsCtrl',function($scope, $ionicPopup){

	$scope.storeType =  function(){
		$ionicPopup.show({
			title: '<p align="left" style="font-size: 100px !important"><font color="black">Store Type</font></p>',
			templateUrl: 'templates/template-settings/store-type.html'
		});
	};

	$scope.closeStoreType = function(){
		console.log(1);
	};


});