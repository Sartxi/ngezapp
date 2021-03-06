'use strict';

angular.module('ezapp')
.directive('header', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'views/static/partials/header.html'
    };
})

.directive('headmenu', function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 scope.pgScroll = true;
             } else {
                 scope.pgScroll = false;
             }
             if (this.pageYOffset >= 700) {
                 scope.hideHero = true;
             } else {
                 scope.hideHero = false;
             }
            scope.$apply();
        });
    };
})

.directive('footer', function () {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'views/static/partials/footer.html'
    };
})

.directive('alerts', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/static/partials/alerts.html'
    };
})

.directive('browser', function () {
    return {
        restrict: 'A',
        templateUrl: 'views/static/partials/browser.html'
    };
})

.directive('loader', function () {
    return {
        restrict: 'EA',
        templateUrl: 'views/static/partials/loading.html'
    };
})

.directive('saveMsg', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/static/partials/checkmark.html'
    };
})

.directive('date', function($filter) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function(date) {
                return $filter('formatDate')(date);
            });
        }
    };
});
