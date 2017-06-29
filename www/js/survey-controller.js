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

    // Function for removing data according to status companion age and range
    $scope.companionAge = function(status, prop, val){
        if(status == true){
            $rootScope.answer.qP5[prop].companion_range = val;
        }
        else if(status == false){
            try{
                delete $rootScope.answer.qP5[prop];
                delete $rootScope.answer.qP5[prop]['companion_range'];
            } catch(err) { } 

            try{
                delete $rootScope.answer.qP5[prop]['total'];
            } catch(err) { }
        }
    };

    // Scope for disabling Question A section
    $scope.qAsection1 = false;
    $scope.qAsection2 = false

    // Scope for disabling Question A section
    $scope.qBsection1 = false;
    $scope.qBsection2 = false

    //Section2  QA Disable 
    $interval(function(){    
        try{
            if($rootScope.answer.qA.sub.shop_name || $rootScope.answer.qA.sub.shop_floor){
                $scope.qAsection2 = true;
                // Delete this object if the section one has value
                delete $rootScope.answer.qA.sub.brgy;
                delete $rootScope.answer.qA.sub.est_name;
                delete $rootScope.answer.qA.sub.city;
                delete $rootScope.answer.qA.sub.region;
                delete $rootScope.answer.qA.sub.province;
                delete $rootScope.answer.qA.sub.street_name; 
                delete $rootScope.answer.qA.sub.building_no;
            }
            else{
                $scope.qAsection2 = false;
            }
        }catch(err) {}
    },1000);

    //Section1 QA Disable 
    $interval(function(){    
        try{
            if($rootScope.answer.qA.sub.brgy|| $rootScope.answer.qA.sub.city || $rootScope.answer.qA.sub.region || $rootScope.answer.qA.sub.province || $rootScope.answer.qA.sub.street_name || $rootScope.answer.qA.sub.building_no || $rootScope.answer.qA.sub.est_name){
                $scope.qAsection1 = true;
                 // Delete this object if the section two has value
                delete $rootScope.answer.qA.sub.shop_name;
                delete $rootScope.answer.qA.sub.shop_floor;
            }
            else{
                $scope.qAsection1 = false;
            }
        }catch(err) {}
    },1000);


    //Section2  QB Disable 
    $interval(function(){    
        try{
            if($rootScope.answer.qB.sub.shop_name || $rootScope.answer.qB.sub.shop_floor){
                $scope.qBsection2 = true;
                // Delete this object if the section one has value
                delete $rootScope.answer.qB.sub.brgy;
                delete $rootScope.answer.qB.sub.est_name;
                delete $rootScope.answer.qB.sub.city;
                delete $rootScope.answer.qB.sub.region;
                delete $rootScope.answer.qB.sub.province;
                delete $rootScope.answer.qB.sub.street_name; 
                delete $rootScope.answer.qB.sub.building_no;
            }
            else{
                $scope.qBsection2 = false;
            }
        }catch(err) {}
    },1000);
    
    //Section1 QB Disable 
    $interval(function(){    
        try{
            if($rootScope.answer.qB.sub.brgy|| $rootScope.answer.qB.sub.city || $rootScope.answer.qB.sub.region || $rootScope.answer.qB.sub.province || $rootScope.answer.qB.sub.street_name || $rootScope.answer.qB.sub.building_no || $rootScope.answer.qB.sub.est_name){
                $scope.qBsection1 = true;
                 // Delete this object if the section two has value
                delete $rootScope.answer.qB.sub.shop_name;
                delete $rootScope.answer.qB.sub.shop_floor;
            }
            else{
                $scope.qBsection1 = false;
            }
        }catch(err) {}
    },1000);


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


    // Filter Location QP Mall - Foodcourt
    $scope.QPFilter = {
        region: function(id){
            var temp = Location.province();
            var province = [];
            angular.forEach(temp,function(value ,key){
                if(value.regCode == id){
                    province.push(value);
                }
            });
            $rootScope.qp_provinces = province;
        },
        province: function(id){
            var temp = Location.cityMunicipal();
            var cityMunicipal = [];
            angular.forEach(temp,function(value,key){
                if(value.provCode == id){
                    cityMunicipal.push(value);
                }
            });
            $rootScope.qp_city = cityMunicipal;
        },
        city: function(id){
            var temp = Location.brgy();
            var brgy = [];
            angular.forEach(temp,function(value,key){ 
                if(value.citymunCode == id){
                    brgy.push(value);
                }
            });
            $rootScope.qp_brgy =  brgy;
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


    // Initialize Locations for Question P Mall - Foodcourt
    $rootScope.qp_regions = Location.region();
    $rootScope.qp_provinces = [];
    $rootScope.qp_city = [];
    $rootScope.qp_brgy = [];


    // Initialize object that will hold the answers
    $rootScope.answer = { };


    try{
    	// Load the data to $rootScope.answers
    	// Comeup to this approach is due to un stoppable reload of controllers
    	data = $window.localStorage.getItem('survey_answers');
    	if(data){
    		$rootScope.answer = JSON.parse(data);

            // Question A Mall - Foodcourt
            if($rootScope.answer.qA.sub.region){
                $rootScope.qa_regions.push($rootScope.answer.qA.sub.region);
            }
            if($rootScope.answer.qA.sub.province){
                $rootScope.qa_provinces.push($rootScope.answer.qA.sub.province);
            }
            if($rootScope.answer.qA.sub.city){
                $rootScope.qa_city.push($rootScope.answer.qA.sub.city);
            }
            if($rootScope.answer.qA.sub.brgy){
                $rootScope.qa_brgy.push($rootScope.answer.qA.sub.brgy);
            }
        

            // Question B Mall - Foodcourt
            if($rootScope.answer.qB.sub.region){
                $rootScope.qb_regions.push($rootScope.answer.qB.sub.region);
            }
            if($rootScope.answer.qB.sub.province){
                $rootScope.qb_provinces.push($rootScope.answer.qB.sub.province);
            }
            if($rootScope.answer.qB.sub.city){
               $rootScope.qb_city.push($rootScope.answer.qB.sub.city);
            }
            if($rootScope.answer.qB.sub.brgy){
               $rootScope.qb_brgy.push($rootScope.answer.qB.sub.brgy);   
            }

            // Question P Mall - Foodcourt and Instore and Free Stand
            $rootScope.qp_regions.push($rootScope.answer.qP3.sub.region);
            $rootScope.qp_provinces.push($rootScope.answer.qP3.sub.province);
            $rootScope.qp_city.push($rootScope.answer.qP3.sub.city);
            $rootScope.qp_brgy.push($rootScope.answer.qP3.sub.brgy);
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
            try{
                delete $rootScope.answer[p1][p2];
            }catch(err) {}
    	},
        single: function(p1){
            try {
                delete $rootScope.answer[p1]; 
            }catch(err){ }
        }
    };

    // Debugger for answers
    $scope.debug = function(){
    	console.info($rootScope.answer);
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
    			$window.localStorage.setItem('survey_answers',data);
                if($rootScope.store_type == 'Mall' || $rootScope.store_type == 'Food Court'){
                    $state.go('mall-survey-a');
                }
    		}
    	},
        pageQA: function(){
            // Validation for QA Mall - Foodcourt
            if($scope.qAsection1 == false){
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
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('shop_floor') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('shop_name') == true && $rootScope.answer.qA.sub.shop_name == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('shop_floor') == true && $rootScope.answer.qA.sub.shop_floor == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else{
                    var data = JSON.stringify($rootScope.answer); 
                    $window.localStorage.setItem('survey_answers',data);
                    if($rootScope.store_type == 'Mall' || $rootScope.store_type == 'Food Court'){
                        $state.go('mall-survey-b');
                    }
                }
            }
            else if($scope.qAsection2 == false){
                if($rootScope.answer.hasOwnProperty('qA') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('ans2')  == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans == 'Others' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('est_name') == false){
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
            }
            
        },
        pageQB: function(){
            // Validation for QB Mall - Foodcourt
            if($scope.qBsection1 == false){
                if($rootScope.answer.hasOwnProperty('qB') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('shop_name') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('shop_floor') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('shop_name') == true && $rootScope.answer.qB.sub.shop_name == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('shop_floor') == true && $rootScope.answer.qB.sub.shop_floor == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else{
                    var data = JSON.stringify($rootScope.answer); 
                    $window.localStorage.setItem('survey_answers',data);
                    if($rootScope.store_type == 'Mall' || $rootScope.store_type == 'Food Court'){
                        $state.go('personal-info');
                    }
                }

            }
            else if($scope.qBsection2 == false){

                if($rootScope.answer.hasOwnProperty('qB') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans == 'Others' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('est_name') == false){
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
                        $state.go('personal-info');
                    }
                }
            }
            
        },
        pageQP: function(){
            // Validation for QP
            if($rootScope.answer.q4.ans != 'None'){
                if($rootScope.answer.hasOwnProperty('qP1') == false || $rootScope.answer.hasOwnProperty('qP2') == false || $rootScope.answer.hasOwnProperty('qP4') == false || $rootScope.answer.hasOwnProperty('qP3') == false || $rootScope.answer.hasOwnProperty('qP5') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if(angular.equals({}, $rootScope.answer.qP5) == true ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('est_name') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('est_name') == true && $rootScope.answer.qP3.sub.est_name == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('est_name') == true && $rootScope.answer.qP3.sub.est_name == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('region') == true && $rootScope.answer.qP3.sub.region == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('region') == true && $rootScope.answer.qP3.sub.region == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }

                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('province') == true && $rootScope.answer.qP3.sub.province == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('province') == true && $rootScope.answer.qP3.sub.province == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }

                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('city') == true && $rootScope.answer.qP3.sub.city == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('city') == true && $rootScope.answer.qP3.sub.province == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }

                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('brgy') == true && $rootScope.answer.qP3.sub.brgy == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('brgy') == true && $rootScope.answer.qP3.sub.brgy == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }

                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('region') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('province') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('city') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('brgy') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans1') == true && $rootScope.answer.qP5.ans1.active == true && $rootScope.answer.qP5.ans1.hasOwnProperty('total') == false ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans1') == true && $rootScope.answer.qP5.ans1.active == true && $rootScope.answer.qP5.ans1.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans1.total == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans2') == true && $rootScope.answer.qP5.ans2.active == true && $rootScope.answer.qP5.ans2.hasOwnProperty('total') == false ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans2') == true && $rootScope.answer.qP5.ans2.active == true && $rootScope.answer.qP5.ans2.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans2.total == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans3') == true && $rootScope.answer.qP5.ans3.active == true && $rootScope.answer.qP5.ans3.hasOwnProperty('total') == false ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans3') == true && $rootScope.answer.qP5.ans3.active == true && $rootScope.answer.qP5.ans3.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans3.total == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans4') == true && $rootScope.answer.qP5.ans4.active == true && $rootScope.answer.qP5.ans4.hasOwnProperty('total') == false ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans4') == true && $rootScope.answer.qP5.ans4.active == true && $rootScope.answer.qP5.ans4.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans4.total == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans5') == true && $rootScope.answer.qP5.ans5.active == true && $rootScope.answer.qP5.ans5.hasOwnProperty('total') == false ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans5') == true && $rootScope.answer.qP5.ans5.active == true && $rootScope.answer.qP5.ans5.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans5.total == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans6') == true && $rootScope.answer.qP5.ans6.active == true && $rootScope.answer.qP5.ans6.hasOwnProperty('total') == false ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans6') == true && $rootScope.answer.qP5.ans6.active == true && $rootScope.answer.qP5.ans6.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans6.total == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans7') == true && $rootScope.answer.qP5.ans7.active == true && $rootScope.answer.qP5.ans7.hasOwnProperty('total') == false ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans7') == true && $rootScope.answer.qP5.ans7.active == true && $rootScope.answer.qP5.ans7.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans7.total == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans1') == true && $rootScope.answer.qP5.ans1.active == true && $rootScope.answer.qP5.ans1.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans1.total != "" && isNaN($rootScope.answer.qP5.ans1.total) == true){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans2') == true && $rootScope.answer.qP5.ans2.active == true && $rootScope.answer.qP5.ans2.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans2.total != "" && isNaN($rootScope.answer.qP5.ans2.total) == true){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans3') == true && $rootScope.answer.qP5.ans3.active == true && $rootScope.answer.qP5.ans3.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans3.total != "" && isNaN($rootScope.answer.qP5.ans3.total) == true ){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans4') == true && $rootScope.answer.qP5.ans4.active == true && $rootScope.answer.qP5.ans4.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans4.total != "" && isNaN($rootScope.answer.qP5.ans4.total) == true){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans5') == true && $rootScope.answer.qP5.ans5.active == true && $rootScope.answer.qP5.ans5.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans5.total != "" && isNaN($rootScope.answer.qP5.ans5.total) == true){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans6') == true && $rootScope.answer.qP5.ans6.active == true && $rootScope.answer.qP5.ans6.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans6.total != "" && isNaN($rootScope.answer.qP5.ans6.total) == true){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans7') == true && $rootScope.answer.qP5.ans7.active == true && $rootScope.answer.qP5.ans7.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans7.total != "" && isNaN($rootScope.answer.qP5.ans7.total) == true ){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans1') == true && $rootScope.answer.qP5.ans1.active == true && $rootScope.answer.qP5.ans1.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans1.total != "" && isNaN($rootScope.answer.qP5.ans1.total) == false && $rootScope.answer.qP5.ans1.total <=0){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans2') == true && $rootScope.answer.qP5.ans2.active == true && $rootScope.answer.qP5.ans2.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans2.total != "" && isNaN($rootScope.answer.qP5.ans2.total) == false && $rootScope.answer.qP5.ans2.total <=0){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans3') == true && $rootScope.answer.qP5.ans3.active == true && $rootScope.answer.qP5.ans3.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans3.total != "" && isNaN($rootScope.answer.qP5.ans3.total) == false && $rootScope.answer.qP5.ans3.total <=0){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans4') == true && $rootScope.answer.qP5.ans4.active == true && $rootScope.answer.qP5.ans4.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans4.total != "" && isNaN($rootScope.answer.qP5.ans4.total) == false && $rootScope.answer.qP5.ans4.total <=0){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans5') == true && $rootScope.answer.qP5.ans5.active == true && $rootScope.answer.qP5.ans5.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans5.total != "" && isNaN($rootScope.answer.qP5.ans5.total) == false && $rootScope.answer.qP5.ans5.total <=0){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans6') == true && $rootScope.answer.qP5.ans6.active == true && $rootScope.answer.qP5.ans6.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans6.total != "" && isNaN($rootScope.answer.qP5.ans6.total) == false && $rootScope.answer.qP5.ans6.total <=0){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP5') == true && $rootScope.answer.qP5.hasOwnProperty('ans7') == true && $rootScope.answer.qP5.ans7.active == true && $rootScope.answer.qP5.ans7.hasOwnProperty('total') == true && $rootScope.answer.qP5.ans7.total != "" && isNaN($rootScope.answer.qP5.ans7.total) == false && $rootScope.answer.qP5.ans7.total <=0 ){
                    Toast.show("Please set correct field values . . .","short","center");
                }
                else{
                    // Code Save here
                }
                
            }
            else{

                if($rootScope.answer.hasOwnProperty('qP1') == false || $rootScope.answer.hasOwnProperty('qP2') == false || $rootScope.answer.hasOwnProperty('qP4') == false || $rootScope.answer.hasOwnProperty('qP3') == false ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('est_name') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('est_name') == true && $rootScope.answer.qP3.sub.est_name == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('est_name') == true && $rootScope.answer.qP3.sub.est_name == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('region') == true && $rootScope.answer.qP3.sub.region == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('region') == true && $rootScope.answer.qP3.sub.region == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }

                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('province') == true && $rootScope.answer.qP3.sub.province == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('province') == true && $rootScope.answer.qP3.sub.province == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }

                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('city') == true && $rootScope.answer.qP3.sub.city == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('city') == true && $rootScope.answer.qP3.sub.province == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }

                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('brgy') == true && $rootScope.answer.qP3.sub.brgy == "" ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('brgy') == true && $rootScope.answer.qP3.sub.brgy == null ){
                    Toast.show("Please fill up all fields . . .","short","center");
                }

                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('region') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('province') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('city') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qP3') == true && $rootScope.answer.qP3.hasOwnProperty('sub') == true && $rootScope.answer.qP3.sub.hasOwnProperty('brgy') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else{
                    // Code save here
                }
            }
            

            $scope.debug();
        },
    	backState: function(page){
    		var data = JSON.stringify($rootScope.answer);
    		$window.localStorage.setItem('survey_answers',data);
            $state.go(page);

    	}
    };
    
});