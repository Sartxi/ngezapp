'use strict';

(function() {

    /**
     * @ngdoc function
     * @name ezadmin.controller:AppCtrl
     * @description
     * # AppCtrl
     * Application controller of the ngezadmin
     */

    function AppCtrl($scope, $log, LanguageService, $rootScope, $state, $window) {
        var scope = $scope;
        var root = $rootScope;

        function init() {
            scope.staticContent = LanguageService.check();
            scope.mobilemenu = false;
        }

        var w = angular.element($window);
        $scope.$watch(function () {
            return $window.innerWidth;
        }, function (v) {
            if (v <= 993) {
                scope.hamburgers = true;
            } else {
                scope.hamburgers = false;
            }
            if (v <= 767) {
                scope.funsize = true;
            } else {
                scope.funsize = false;
            }
            if (v <= 499) {
                scope.micro = true;
            } else {
                scope.micro = false;
            }
        }, true);
        w.bind('resize', function(){
            scope.$apply();
        });

        scope.toggleMenu = function () {
            scope.mobilemenu = !scope.mobilemenu;
        };

        // Language
        scope.setlanguage = function () {
            LanguageService.toggle();
            scope.staticContent = LanguageService.check();
            LanguageService.content($state.current);
        };

        init();
    }

    angular.module('ezapp')
        .controller('AppCtrl', ['$scope', '$log', 'LanguageService', '$rootScope', '$state', '$window', AppCtrl]);
})();
