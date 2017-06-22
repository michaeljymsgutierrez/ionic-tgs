// Survey Controller
app.controller('surveyCtrl',function($ionicSideMenuDelegate, $scope, $ionicHistory, $rootScope, $window, Toast){

	// Toggle Sidemenu on survey controller
	$rootScope.toggleLeft = function(){
        $ionicSideMenuDelegate.toggleLeft();
    };

    // Initialize object that will hold the answers
    $rootScope.answer = { };

	// Renable side menu  
	$ionicSideMenuDelegate.canDragContent(true);

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

   	// Initialize ease access data from localstorage
    $rootScope.store_name = $window.localStorage.getItem('store_name');
    $rootScope.store_type = $window.localStorage.getItem('store_type');
    $rootScope.language = $window.localStorage.getItem('language');

    // Delete Object Property
    $scope.deleteObj = {
    	dual: function(p1, p2){
    		delete $rootScope.answer[p1][p2];
    	}
    };

    // Debugger for answers
    $scope.debug = function(){
    	console.log($rootScope.answer);
    };

    // Validate Page Content
    $scope.validatePage = {
    	page1: function(){
    		if($rootScope.answer.hasOwnProperty("q1") == false || $rootScope.answer.hasOwnProperty("q2") == false ){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}

    		if($rootScope.answer.hasOwnProperty('q2') == true && $rootScope.answer.q2.ans == "Today" && $rootScope.answer.q2.hasOwnProperty('sub') == false){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}
    	}

    };
    
});