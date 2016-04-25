'use strict';

(function() {

    /**
    * @ngdoc function
    * @name ezadmin.controller:HomeCtrl
    * @description
    * # HomeCtrl
    * HomeCtrl
    */

    function HomeCtrl($rootScope, request, StateService) {
        var self = this;
        var language = $rootScope.language;

        function init() {
            getContent();
        }

        function getContent() {
            var pageId = StateService.getPageId();
            request.name = 'pages';
            request.getObject(pageId).then(function (res) {
                if (language === 'en') {
                    self.content = res.enContent[0];
                    StateService.setMeta(res.enContent[0]);
                } else if (language === 'es') {
                    self.content = res.esContent[0];
                    StateService.setMeta(res.esContent[0]);
                }
            }, function (err) {
                console.log(err);
            });
        }

        init();
    }

    angular.module('ezadmin')
        .controller('HomeCtrl', ['$rootScope', 'request', 'StateService', HomeCtrl]);
})();
