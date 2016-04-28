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
        var pageId = $rootScope.stateInfo.pageId;
        var language = $rootScope.stateInfo.language;

        function init() {
            getContent();
        }

        function getContent() {
            request.name = 'pages';
            request.getObject(pageId).then(function (res) {
                angular.forEach(res.content, function (obj) {
                    if (obj.language === language) {
                        self.content = obj;
                        StateService.setMeta(obj);
                    }
                });
            }, function (err) {
                console.log(err);
            });
        }

        init();
    }

    angular.module('ezapp')
        .controller('HomeCtrl', ['$rootScope', 'request', 'StateService', HomeCtrl]);
})();
