'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:AppCtrl
     * @description
     * # AppCtrl
     * Application controller of the ngezadmin
     */


    function AppCtrl($rootScope) {
        var self = this;

        function init() {
            self.snapApp = true;
            $rootScope.snapApp = true;
            $rootScope.language = 'en'; // set language with dropdown
        }

        init();
    }

    angular.module('ezadmin')
        .controller('AppCtrl', ['$rootScope', AppCtrl]);
})();
