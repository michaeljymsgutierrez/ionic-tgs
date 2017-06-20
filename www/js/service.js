// Include all app services

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

	// Convert ISO to 24 HR format
	this.toTime = function(dt){
	   return $filter('date')(dt,'H:mm');
	}

	// Convert datetime to timestamp
	this.toTimestamp = function(dt){
		return Math.floor(new Date(dt).getTime()/1000);
	}
});