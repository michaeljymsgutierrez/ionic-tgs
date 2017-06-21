// Survey Controller
app.controller('surveyCtrl',function($ionicSideMenuDelegate, $scope, $ionicHistory, $rootScope, $window){

	// Toggle Sidemenu on survey controller
	$rootScope.toggleLeft = function(){
        $ionicSideMenuDelegate.toggleLeft();
    };

    // Clear History after start app 
    $ionicHistory.clearHistory();
	
	// Watch side menu event throug rootscope
   	$rootScope.$watch(function(){
   		// Return ratio
      	return $ionicSideMenuDelegate.getOpenRatio();
    },function (ratio){
    	// Broadcast the value
	  	$rootScope.sidemenuopened = (ratio == 1);
    });

   	// Iniailize ease access data from localstorage
    $rootScope.store_name = $window.localStorage.getItem('store_name');
    $rootScope.store_type = $window.localStorage.getItem('store_type');

});