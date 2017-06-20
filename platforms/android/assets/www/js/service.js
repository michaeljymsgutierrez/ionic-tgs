// Include all app services

// Service for showing Toast Notification
app.service('Toast',function($cordovaToast){
	this.show = function(msg,duration,pos){
		$cordovaToast.show(msg,duration,pos);
	};
});