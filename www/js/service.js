// Include all app services and constants

// API endpoint
// app.constant('endpoint','https://staging.tgs.vielsoft.com/api/tgs');
app.constant('endpoint','http://192.168.10.56/api/tgs');

// Service for showing Toast Notification
app.service('Toast',function($cordovaToast){
	this.show = function(msg,duration,pos){
		$cordovaToast.show(msg,duration,pos);
	};
});

// Service for formatting date 
app.service('dateFormatter',function($filter){
	// Convert ISO to date only
	this.toDate = function(dt){
		return $filter('date')(dt,'yyyy-MM-dd');
	}

	// Convert datetime to standart 24hr formate datetime
	this.toStandard = function(dt){
		return $filter('date')(dt,'yyyy-MM-dd HH:mm:ss');
	}

	// Convert ISO to 24 HR format
	this.toTime = function(dt){
	   return $filter('date')(dt,'HH:mm');
	}

	// Convert ISO to 24 Hr format with secs
	this.toTimeSec = function(dt){
		return $filter('date')(dt,'HH:mm:ss');
	}

	// Format scheds for display
	this.summarize = function(dt,ts,te){
		return $filter('date')(dt,'MMM dd, y') + "; " + $filter('date')(ts,'HH:mm') + " - " + $filter('date')(te,'HH:mm'); 
	}

	// Convert datetime to timestamp
	this.toTimestamp = function(dt){
		return Math.floor(new Date(dt).getTime()/1000);
	}
});

// Service for writing  schedule properties on localStorage
app.service('schedule',function($window){
	// Set localStorage schedule type
	this.setType = function(sched_type){
		$window.localStorage.setItem('type',sched_type);
	}

	// Set localStorage schedule start
	this.setStart = function(sched_start){
		$window.localStorage.setItem('start',sched_start);
	}

	// Set localStorage schedule end
	this.setEnd = function(sched_end){
		$window.localStorage.setItem('end',sched_end);
	}

});

// Service for READ and WRITE to localStorage
app.service('storage',function($window){
	// Write file to localStorage
	this.write = function(key,val){
		$window.localStorage.setItem(key,val);
	};

	// Read file to localStorage
	this.read = function(key){
		return $window.localStorage.getItem(key);
	};
});

// Loading Service
app.service('loadingState',function($ionicLoading){
      this.show = function(ms){
          $ionicLoading.show({
              template: '<ion-spinner icon="ios-small"></ion-spinner></br><span style="color:#FFFFFF !important;">Please wait while syncing data . . .<span>',
              showBackDrop: false,
              duration: ms
          });
      };
});


// Service for generating checksum
app.service('checksum',function(){
	this.generate = function(str){
        var tohashObj = angular.toJson(str);
        var hash =  CryptoJS.MD5(tohashObj);
        return hash.toString();
	}
});

// Service for reinitializing  current schedule
app.service('reinitializeSchedule',function($cordovaSQLite, schedule, storage, dateFormatter){
	this.update = function(){
		
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

	}
});