// Survey Controller
app.controller('surveyCtrl',function($ionicSideMenuDelegate, $scope, $ionicHistory, $rootScope){

	// Toggle Sidemenu on survey controller
	$rootScope.toggleLeft = function(){
        $ionicSideMenuDelegate.toggleLeft();
    };

    // Clear History after start app 
    $ionicHistory.clearHistory();
	
   $rootScope.$watch(function(){
      return $ionicSideMenuDelegate.getOpenRatio();
   },function (ratio){
	  $rootScope.sidemenuopened = (ratio == 1);
	});

});