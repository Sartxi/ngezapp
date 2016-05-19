'use strict';

angular.module('ezapp')
.directive('checkBoxesForm', function ($timeout) {
	return {
		restrict: 'A',
		templateUrl: 'views/static/partials/checksForm.html',
        link: function(scope) {
			scope.submit = {
				age: false,
				bank: false,
				bankuse: false,
				income: false,
				incomelimit: false,
				checking: false
			};
			//check requirements form in 'Is Snap right for me?'
			function checksError() {
				scope.checkserror = true;
	            $timeout(function() {
	                scope.checkserror = false;
	            }, 550);
	        }
			scope.submitChecks = function () {
				if (scope.submit.age && scope.submit.bank && scope.submit.bankuse && scope.submit.income && scope.submit.incomelimit && scope.submit.checking) {
					// I am guessing that we are taking them to the consumer application
					console.log('Got UM');
				} else {
					checksError();
				}
			};
        }
	};
});
