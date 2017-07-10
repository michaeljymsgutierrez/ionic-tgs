// Include all directives

// Four breaks Directive
app.directive('lineBreaker',function(){
	return {
		restrict: 'E',
		template: "<br/><br/><br/<br/>"
	}
});

// Two breaks Directive
app.directive('lineBreaker2',function(){
	return {
		restrict: 'E',
		template: "<br/><br/>"
	}
});

// Three breaks Directive
app.directive('lineBreaker3',function(){
	return {
		restrict: 'E',
		template: "<br/><br/><br/>"
	}
});

// Stripped emoji
app.directive('noEmoji',function(){
    //Custom Directive for checking negative value
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element , attrs, ngModel){
            scope.$watch(attrs.ngModel, function(val){
                if(val != ""){
                  // Remove occurence of emoji
                  try{
                  	  var text = val.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, '')
	                  ngModel.$setViewValue(text);
	                  ngModel.$render();
                  }catch(err) {}
                }
            });
        }
    }
});