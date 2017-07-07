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