'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:AppCtrl
     * @description
     * # AppCtrl
     * Application controller of the ngezadmin
     */


    function AppCtrl($scope, $log, LanguageService, $rootScope, $sessionStorage, $state) {
        var scope = $scope;
        var root = $rootScope;

        function init() {
            root.staticContent = LanguageService.check();
        }

        // Language
        root.setlanguage = function () {
            LanguageService.toggle();
            root.staticContent = LanguageService.check();
            LanguageService.content($state.current);
        };

        init();
    }

    angular.module('ezapp')
        .controller('AppCtrl', ['$scope', '$log', 'LanguageService', '$rootScope', '$sessionStorage', '$state', AppCtrl]);
})();
