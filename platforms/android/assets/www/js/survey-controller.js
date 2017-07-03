// Survey Controller
app.controller('surveyCtrl',function(loadingState, $ionicSideMenuDelegate, $scope, $ionicHistory, $rootScope, $window, Toast, $state, Location, $interval, $timeout, $ionicPlatform, $cordovaSQLite, dateFormatter, schedule, storage, endpoint, $http, checksum){

    // Execute process needed platform ready
    $ionicPlatform.ready(function(){
        // Initialized unsynced number of data
        $rootScope.unsynced_data = 0;
        // Function for fetching unsynced data 
        $cordovaSQLite.execute(db,"SELECT * FROM survey_data WHERE is_synced = 0").then(function(res){
            $rootScope.unsynced_data = res.rows.length;
        });

        // Load Store settings from  data base
        $cordovaSQLite.execute(db,'SELECT * FROM store_settings').then(function(res){
            if(res.rows.length != 0){
                $window.localStorage.setItem('store_name',res.rows.item(0).store_branch);
                $window.localStorage.setItem('store_code',res.rows.item(0).store_code);
                $window.localStorage.setItem('store_type',res.rows.item(0).store_type);
                $window.localStorage.setItem('store_manager',res.rows.item(0).store_manager);
                $window.localStorage.setItem('store_address',res.rows.item(0).store_address);
            }
        });

        // Determine schedule type, start , end for saving dat to database
        var dateNow = new Date().getDay();
        storage.write('surveyBtn','false');
        if(dateNow == 0 || dateNow == 6){

            $cordovaSQLite.execute(db,"SELECT * FROM payday_weekend").then(function(res){
                if(res.rows.length != 0){
                    var d1 =  dateFormatter.toDate(new Date());
                    var d2 = dateFormatter.toDate(new Date(res.rows.item(0).payday_weekend_date));
                    var d3 = dateFormatter.toTimestamp(dateFormatter.toStandard(new Date()));
                    var start = dateFormatter.toTimestamp(dateFormatter.toDate(new Date(res.rows.item(0).payday_weekend_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).payday_weekend_start)));
                    var end = dateFormatter.toTimestamp(dateFormatter.toDate(new Date(res.rows.item(0).payday_weekend_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).payday_weekend_end)));
                    if(d1 == d2 && (d3 >= start && d3 <= end)){
                        schedule.setType("Payday Weekend");
                        schedule.setStart(dateFormatter.toDate(new Date(res.rows.item(0).payday_weekend_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).payday_weekend_start)));
                        schedule.setEnd(dateFormatter.toDate(new Date(res.rows.item(0).payday_weekend_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).payday_weekend_end)));
                        storage.write('surveyBtn','true');
                    }
                }
            });

            $cordovaSQLite.execute(db,"SELECT * FROM non_payday_weekend").then(function(res){
                if(res.rows.length != 0){
                    var d1 =  dateFormatter.toDate(new Date());
                    var d2 = dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekend_date));
                    var d3 = dateFormatter.toTimestamp(dateFormatter.toStandard(new Date()));
                    var start = dateFormatter.toTimestamp(dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekend_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).non_payday_weekend_start)));
                    var end = dateFormatter.toTimestamp(dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekend_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).non_payday_weekend_end)));
                    if(d1 == d2 && (d3 >= start && d3 <= end)){
                        schedule.setType("Non Payday Weekend");
                        schedule.setStart(dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekend_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).non_payday_weekend_start)));
                        schedule.setEnd(dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekend_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).non_payday_weekend_end)));
                        storage.write('surveyBtn','true');
                    }
                }

            });

        }
        else{

            $cordovaSQLite.execute(db,"SELECT * FROM payday_weekday").then(function(res){
                if(res.rows.length != 0){
                    var d1 =  dateFormatter.toDate(new Date());
                    var d2 = dateFormatter.toDate(new Date(res.rows.item(0).payday_weekday_date));
                    var d3 = dateFormatter.toTimestamp(dateFormatter.toStandard(new Date()));
                    var start = dateFormatter.toTimestamp(dateFormatter.toDate(new Date(res.rows.item(0).payday_weekday_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).payday_weekday_start)));
                    var end = dateFormatter.toTimestamp(dateFormatter.toDate(new Date(res.rows.item(0).payday_weekday_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).payday_weekday_end)));
                    if(d1 == d2 && (d3 >= start && d3 <= end)){
                        schedule.setType("Payday Weekday");
                        schedule.setStart(dateFormatter.toDate(new Date(res.rows.item(0).payday_weekday_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).payday_weekday_start)));
                        schedule.setEnd(dateFormatter.toDate(new Date(res.rows.item(0).payday_weekday_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).payday_weekday_end)));
                        storage.write('surveyBtn','true');
                    }
                }
            });

            $cordovaSQLite.execute(db,"SELECT * FROM non_payday_weekday").then(function(res){
                if(res.rows.length != 0){
                    var d1 =  dateFormatter.toDate(new Date());
                    var d2 = dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekday_date));
                    var d3 = dateFormatter.toTimestamp(dateFormatter.toStandard(new Date()));
                    var start = dateFormatter.toTimestamp(dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekday_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).non_payday_weekday_start)));
                    var end = dateFormatter.toTimestamp(dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekday_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).non_payday_weekday_end)));
                    if(d1 == d2 && (d3 >= start && d3 <= end)){
                        schedule.setType("Non Payday Weekday");
                        schedule.setStart(dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekday_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).non_payday_weekday_start)));
                        schedule.setEnd(dateFormatter.toDate(new Date(res.rows.item(0).non_payday_weekday_date)) + " " + dateFormatter.toTimeSec(new Date(res.rows.item(0).non_payday_weekday_end)));
                        storage.write('surveyBtn','true');
                    }
                }

            });
        }

    });

    // Function for disabling survey when no schedule is set on that day
    $rootScope.clickSurvey = function(){
            if(storage.read('surveyBtn') == "true"){
                // If there is schedule within the range of survey settings with time
                $rootScope.toggleLeft();
                $state.go('survey-landing');                
            }
            else{
                // Prompt to show there is no schedule
                Toast.show("Sorry, you are not allowed to conduct survey today. Instead, you can access this feature on your next survey date. Thank you!","long","center");
            }
    };

     // Function for saving data
    $scope.saveSurvey = function(){
        // Form objects to  save
        var save = {
            survey_answers: storage.read('survey_answers'),
            store_type: storage.read('store_type'),
            schedule_type: storage.read('type'),
            language_type: storage.read('language'),
            date_start: storage.read('start'),
            date_end: storage.read('end'),
            created: dateFormatter.toStandard(new Date()),
            is_synced: 0

        };
        // Function save survey data
        $cordovaSQLite.execute(db,"INSERT INTO survey_data (survey_answers, store_type, schedule_type, language_type, date_start, date_end, created, is_synced) VALUES(?,?,?,?,?,?,?,?)",
        [save.survey_answers, save.store_type, save.schedule_type, save.language_type, save.date_start, save.date_end, save.created, save.is_synced])
        .then(function(res){
            $state.go('survey-thankyou');
            Toast.show('Survey form successfully submitted . . .','short','bottom');
        },function(err){
            console.log(err);
            Toast.show('Error submitting survey form . . .','short','bottom');
        });
    };

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
                else if($rootScope.store_type == 'Instore' || $rootScope.store_type == 'Free Stand'){
                    $state.go('instore-survey-a');
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
                    var data = JSON.stringify($rootScope.answer);
                    $window.localStorage.setItem('survey_answers',data);
                    $scope.saveSurvey();
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
                    var data = JSON.stringify($rootScope.answer);
                    $window.localStorage.setItem('survey_answers',data);
                    $scope.saveSurvey();
                }
            }
        },
        pageQAI: function(){
                // Validation for QA - Instore - Free Stand
                if($rootScope.answer.hasOwnProperty('qA') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('sub') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('ans2')  == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans != 'Home' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('est_name') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('region') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('province') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('city') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('brgy') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.ans != 'Home' && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('est_name') == true && $rootScope.answer.qA.sub.est_name == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('region') == true && $rootScope.answer.qA.sub.region == null){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('province') == true && $rootScope.answer.qA.sub.province == null){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true && $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('city') == true && $rootScope.answer.qA.sub.city == null){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qA') == true &&  $rootScope.answer.qA.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('brgy') == true && $rootScope.answer.qA.sub.brgy == null){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else{
                    var data = JSON.stringify($rootScope.answer); 
                    $window.localStorage.setItem('survey_answers',data);
                    if($rootScope.store_type == 'Instore' || $rootScope.store_type == 'Free Stand'){
                        $state.go('instore-survey-b');
                    }
                }
        },
        pageQBI: function(){
                // Validation for QB - Instore - Free Stand
                if($rootScope.answer.hasOwnProperty('qB') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.hasOwnProperty('sub') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                // else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans != 'Home' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qA.sub.hasOwnProperty('est_name') == false){
                //     Toast.show("Please fill up all fields . . .","short","center");
                // }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('region') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('province') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('city') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('brgy') == false){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.ans != 'Home' && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('est_name') == true && $rootScope.answer.qB.sub.est_name == ""){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('region') == true && $rootScope.answer.qB.sub.region == null){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('province') == true && $rootScope.answer.qB.sub.province == null){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true && $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('city') == true && $rootScope.answer.qB.sub.city == null){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else if($rootScope.answer.hasOwnProperty('qB') == true &&  $rootScope.answer.qB.hasOwnProperty('sub') == true && $rootScope.answer.qB.sub.hasOwnProperty('brgy') == true && $rootScope.answer.qB.sub.brgy == null){
                    Toast.show("Please fill up all fields . . .","short","center");
                }
                else{
                    var data = JSON.stringify($rootScope.answer); 
                    $window.localStorage.setItem('survey_answers',data);
                    if($rootScope.store_type == 'Instore' || $rootScope.store_type == 'Free Stand'){
                        $state.go('personal-info');
                    }
                }
        },
        personalInfoBackState: function(){
            var data = JSON.stringify($rootScope.answer);
            $window.localStorage.setItem('survey_answers',data);
            if($rootScope.store_type == 'Instore' || $rootScope.store_type == 'Free Stand'){
                $state.go('instore-survey-b');
            }
            else if($rootScope.store_type == 'Mall' || $rootScope.store_type == 'Food Court'){
                $state.go('mall-survey-b');
            }
        },
    	backState: function(page){
    		var data = JSON.stringify($rootScope.answer);
    		$window.localStorage.setItem('survey_answers',data);
            $state.go(page);

    	}
    };

    // Platform ready for sync section template
    $ionicPlatform.ready(function(){

        // Initialize active : inactive  class
        $scope.activetabOne = true;
        $scope.activetabTwo = false;
        $rootScope.total_unsycned = 0;
        $rootScope.total_sycned = 0;
        $scope.sync_title = "Unsynced";

        // Get count of unsynced data
        $cordovaSQLite.execute(db,"SELECT * FROM survey_data WHERE is_synced = 0").then(function(res){
           $rootScope.total_unsycned = res.rows.length;
        });

        // Get count of synced data 
        $cordovaSQLite.execute(db,"SELECT * FROM survey_data WHERE is_synced = 1").then(function(res){
           $rootScope.total_sycned = res.rows.length;
        });

        // Show synced data
        $scope.showSynced = function(){
            // Set active class and title
            $scope.activetabOne = false;
            $scope.activetabTwo = true;
            $scope.sync_title = "Synced";

            $cordovaSQLite.execute(db,"SELECT * FROM survey_data WHERE is_synced = 1").then(function(res){
               $rootScope.total_sycned = res.rows.length;
            });    
        };

        // Show unsynced data
        $scope.showUnsynced = function(){
            // Set active class and title
            $scope.activetabOne = true;
            $scope.activetabTwo = false;
            $scope.sync_title = "Unsynced";

            $cordovaSQLite.execute(db,"SELECT * FROM survey_data WHERE is_synced = 0").then(function(res){
               $rootScope.total_unsycned = res.rows.length;
            });
        };

        // Survey sync function
        $scope.syncAllData = function(){
            $cordovaSQLite.execute(db,"SELECT * FROM survey_data WHERE is_synced = 0")
            .then(function(res){
                var length = res.rows.length;
                var items = [];

                // Check if length of unsynced data is 0
                if(length > 0){
                    for(var i = 0; i != length; i++){
                        var parseAnswers = JSON.parse(res.rows.item(i).survey_answers);
                        res.rows.item(i).survey_answers = parseAnswers;
                        items.push(res.rows.item(i));
                    }

                    // Loading Duration
                    var duration = items.length * 1000;
                    loadingState.show(duration);

                    // Store ID
                    var store_id = storage.read('store_code');
                    
                    for(var i = 0; i != items.length; i++){

                        // Get Item ID
                        var updateID = items[i].id;

                        // Format data to be submitted
                        var reqPayload = { 
                            data: {
                                store_id: store_id,
                                survey_answers: items[i].survey_answers,
                                store_type: items[i].store_type,
                                schedule_type: items[i].schedule_type,
                                language_type: items[i].language_type,
                                created: items[i].created,
                                date_start: items[i].date_start,
                                date_end: items[i].date_end
                            }
                        };

                        // Generate Checksum for data
                        reqPayload.checksum = checksum.generate(reqPayload);

                        // POST tgs data
                        $http({
                            url: endpoint + "/" + store_id,
                            method: 'POST',
                            data: reqPayload
                        }).then(function(response){ console.log(response);
                            // Success response
                            if(response.status == "200"){
                                $cordovaSQLite.execute(db,"UPDATE survey_data SET is_synced = 1 WHERE id = ?",[updateID])
                                .then(function(res){
                                    $scope.showUnsynced();
                                    $scope.showSynced();
                                    // Function for fetching unsynced data 
                                    $cordovaSQLite.execute(db,"SELECT * FROM survey_data WHERE is_synced = 0").then(function(res){
                                        $rootScope.unsynced_data = res.rows.length;
                                    });
                                },function(err){
                                    // Error Updating is_synced
                                    console.log(err);
                                });
                            }

                        },function(err){
                            // Error response
                            Toast.show("Something went wrong, Please check your settings Store Code . . .","long","bottom");
                            console.warn(err);
                        });
                    };
                }
                else{
                    // Fallback for unsynced data is 0
                    Toast.show("No data to be sync . . .","long","center");
                }

            });
        };


    });
    
});