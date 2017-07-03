// Include all app services and constants

// API endpoint
app.constant('endpoint','https://staging.tgs.vielsoft.com/api/tgs');

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

//Loading Service
app.service('loadingState',function($ionicLoading){
      this.show = function(ms){
          $ionicLoading.show({
              template: '<ion-spinner icon="dots"></ion-spinner></br><span style="color:#FFFFFF !important;">Please wait while syncing data . . .<span>',
              showBackDrop: false,
              duration: ms
          });
      };
});