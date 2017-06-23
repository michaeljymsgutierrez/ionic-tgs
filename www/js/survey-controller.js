// Survey Controller
app.controller('surveyCtrl',function($ionicSideMenuDelegate, $scope, $ionicHistory, $rootScope, $window, Toast, $state, $location){

	// Toggle Sidemenu on survey controller
	$rootScope.toggleLeft = function(){
        $ionicSideMenuDelegate.toggleLeft();
    };

    // Clear temporary data before starting new survey
    $rootScope.clearStorage = function(){
    	$window.localStorage.removeItem('survey_answers');
    	$state.go('survey-page1');
    }

    // Initialize object that will hold the answers
    $rootScope.answer = { };

    try{
    	// Load the data to $rootScope.answers
    	// Comeup to this approach is due to un stoppable reload of controllers
    	data = $window.localStorage.getItem('survey_answers');
    	if(data){
    		$rootScope.answer = JSON.parse(data);
    	}
    }
    catch(err){ };

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

    $scope.debug();

    // Validate Page Content
    $scope.validatePage = {
    	page1: function(){ 
    		// Page 1 validation
    		if($rootScope.answer.hasOwnProperty("q1") == false || $rootScope.answer.hasOwnProperty("q2") == false ){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}
			else if($rootScope.answer.hasOwnProperty('q2') == true && $rootScope.answer.q2.ans == "Today" && $rootScope.answer.q2.hasOwnProperty('sub') == false){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}
    		else{
    			var data = JSON.stringify($rootScope.answer);
    			$window.localStorage.setItem('survey_answers',data);
    			$state.go('survey-page2');
    		}
    	},
    	page2: function(){
    		// Page 2 validation
    		if($rootScope.answer.hasOwnProperty('q3') == false || $rootScope.answer.hasOwnProperty('q4') == false){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}
    		else if($rootScope.answer.hasOwnProperty('q4') == true && $rootScope.answer.q4.ans == 'Others' && $rootScope.answer.q4.hasOwnProperty('sub') == false){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}
    		else if($rootScope.answer.q4.ans == 'Others' && $rootScope.answer.q4.sub == ''){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}
    		else{
    			var data = JSON.stringify($rootScope.answer);
    			$window.localStorage.setItem('survey_answers',data);
    		}
    	},
    	backState: function(page){ console.log(page);
    		var data = JSON.stringify($rootScope.answer);
    		$window.localStorage.setItem('survey_answers',data);
    		$state.go(page);
    	}
    };
    
});