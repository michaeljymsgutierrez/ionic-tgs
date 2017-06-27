// Survey Controller
app.controller('surveyCtrl',function($ionicSideMenuDelegate, $scope, $ionicHistory, $rootScope, $window, Toast, $state, $location, Location, $interval, $timeout, $ionicPlatform){

	// Toggle Sidemenu on survey controller
	$rootScope.toggleLeft = function(){
        $ionicSideMenuDelegate.toggleLeft();
    };

    // Clear temporary data before starting new survey
    $rootScope.clearStorage = function(){
    	$window.localStorage.removeItem('survey_answers');
    	$state.go('survey-page1');
    }

    // Filter Location QA Mall - Foodcourt
    $scope.QAFilter = {
        region: function(id){
            var temp = Location.province();
            var province = [];
            angular.forEach(temp,function(value ,key){
                if(value.regCode == id){
                    province.push(value);
                }
            });
            $rootScope.qa_provinces = province;
        },
        province: function(id){
            var temp = Location.cityMunicipal();
            var cityMunicipal = [];
            angular.forEach(temp,function(value,key){
                if(value.provCode == id){
                    cityMunicipal.push(value);
                }
            });
            $rootScope.qa_city = cityMunicipal;
        },
        city: function(id){
            var temp = Location.brgy();
            var brgy = [];
            angular.forEach(temp,function(value,key){ 
                if(value.citymunCode == id){
                    brgy.push(value);
                }
            });
            $rootScope.qa_brgy =  brgy;
        }

    }

    // Filter Location QB Mall - Foodcourt
    $scope.QBFilter = {
        region: function(id){
            var temp = Location.province();
            var province = [];
            angular.forEach(temp,function(value ,key){
                if(value.regCode == id){
                    province.push(value);
                }
            });
            $rootScope.qb_provinces = province;
        },
        province: function(id){
            var temp = Location.cityMunicipal();
            var cityMunicipal = [];
            angular.forEach(temp,function(value,key){
                if(value.provCode == id){
                    cityMunicipal.push(value);
                }
            });
            $rootScope.qb_city = cityMunicipal;
        },
        city: function(id){
            var temp = Location.brgy();
            var brgy = [];
            angular.forEach(temp,function(value,key){ 
                if(value.citymunCode == id){
                    brgy.push(value);
                }
            });
            $rootScope.qb_brgy =  brgy;
        }

    }

    // Initialize Locations for Question A Mall - Foodcourt
    $rootScope.qa_regions = Location.region();
    $rootScope.qa_provinces = [];
    $rootScope.qa_city = [];
    $rootScope.qa_brgy = [];

    // Initialize Locations for Question B Mall - Foodcourt
    $rootScope.qb_regions = Location.region();
    $rootScope.qb_provinces = [];
    $rootScope.qb_city = [];
    $rootScope.qb_brgy = [];


    // Initialize object that will hold the answers
    $rootScope.answer = { };


    try{
    	// Load the data to $rootScope.answers
    	// Comeup to this approach is due to un stoppable reload of controllers
    	data = $window.localStorage.getItem('survey_answers');
    	if(data){
    		$rootScope.answer = JSON.parse(data);
            // Question A Mall - Foodcourt
            $rootScope.qa_regions.push($rootScope.answer.qA.sub.region);
            $rootScope.qa_provinces.push($rootScope.answer.qA.sub.province);
            $rootScope.qa_city.push($rootScope.answer.qA.sub.city);
            $rootScope.qa_brgy.push($rootScope.answer.qA.sub.brgy);

            // Question B Mall - Foodcourt
            $rootScope.qb_regions.push($rootScope.answer.qB.sub.region);
            $rootScope.qb_provinces.push($rootScope.answer.qB.sub.province);
            $rootScope.qb_city.push($rootScope.answer.qB.sub.city);
            $rootScope.qb_brgy.push($rootScope.answer.qB.sub.brgy);
    	}
    } catch(err){ };



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
    	console.info($rootScope.answer);
    };

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
    			$state.go('survey-page3');
    		}
    	},
    	page3: function(){
    		// Page 3 validation
    		if($rootScope.answer.hasOwnProperty('q5') == false || $rootScope.answer.hasOwnProperty('q6') == false || $rootScope.answer.hasOwnProperty('q7') == false){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}
    		else if($rootScope.answer.hasOwnProperty('q5') == true && $rootScope.answer.q5.ans =='My companion' && $rootScope.answer.q5.hasOwnProperty('sub') == false ){
    			Toast.show("Please fill up all fields . . .","short","center");
    		}
    		else if($rootScope.answer.hasOwnProperty('q6') == true && isNaN($rootScope.answer.q6.ans) == true){
    			Toast.show("Please set correct field values . . .","short","center");
    		}
    		else{ 
    			$rootScope.answer.q6.ans = parseFloat($rootScope.answer.q6.ans).toFixed(2);
    			var data = JSON.stringify($rootScope.answer);
    			$window.localStorage.setItem('survey_answers',data); $scope.debug();
                if($rootScope.store_type == 'Mall' || $rootScope.store_type == 'Food Court'){
                    $state.go('mall-survey-a');
                }
    		}
    	},
        pageQA: function(){
            // Validation for QA Mall - Foodcourt
            if($rootScope.answer.hasOwnProperty('qA') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('ans2')  == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('shop_name') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('est_name') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('shop_floor') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('region') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('province') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('city') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('brgy') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }

            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('est_name') == true && $rootScope.answer.qA.sub.est_name == ""){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('shop_name') == true && $rootScope.answer.qA.sub.shop_name == ""){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('shop_floor') == true && $rootScope.answer.qA.sub.shop_floor == ""){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('region') == true && $rootScope.answer.qA.sub.region == null){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('province') == true && $rootScope.answer.qA.sub.province == null){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('city') == true && $rootScope.answer.qA.sub.city == null){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('brgy') == true && $rootScope.answer.qA.sub.brgy == null){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else{
                var data = JSON.stringify($rootScope.answer); 
                $window.localStorage.setItem('survey_answers',data);
                if($rootScope.store_type == 'Mall' || $rootScope.store_type == 'Food Court'){
                    $state.go('mall-survey-b');
                }
            }
            
        },
        pageQB: function(){
            // Validation for QB Mall - Foodcourt
            if($rootScope.answer.hasOwnProperty('qB') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('shop_name') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('est_name') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('shop_floor') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('region') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('province') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('city') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('brgy') == false){
                Toast.show("Please fill up all fields . . .","short","center");
            }

            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('est_name') == true && $rootScope.answer.qB.sub.est_name == ""){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('shop_name') == true && $rootScope.answer.qB.sub.shop_name == ""){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('shop_floor') == true && $rootScope.answer.qB.sub.shop_floor == ""){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('region') == true && $rootScope.answer.qB.sub.region == null){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('province') == true && $rootScope.answer.qB.sub.province == null){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('city') == true && $rootScope.answer.qB.sub.city == null){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('brgy') == true && $rootScope.answer.qB.sub.brgy == null){
                Toast.show("Please fill up all fields . . .","short","center");
            }
            else{
                var data = JSON.stringify($rootScope.answer); 
                $window.localStorage.setItem('survey_answers',data);
                if($rootScope.store_type == 'Mall' || $rootScope.store_type == 'Food Court'){
                
                }
            }
            
        },
    	backState: function(page){
    		var data = JSON.stringify($rootScope.answer);
    		$window.localStorage.setItem('survey_answers',data);
            $state.go(page);

    	}
    };
    
});