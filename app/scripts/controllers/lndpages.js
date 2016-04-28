'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:LndPagesCtrl
     * @description
     * # LndPagesCtrl
     * Landing Pages controllers of the ngezadmin
     */


    function LndPagesCtrl($stateParams, request) {
        var self = this;

        var pageId = $stateParams.pageId;
        var language = $stateParams.language;

        function init() {
            self.title = 'Landing Page';
            getContent();
        }

        function getContent() {
            request.name = 'lndPages';
            request.getObject(pageId).then(function (res) {
                angular.forEach(res.content, function (obj) {
                    if (obj.language === language) {
                        self.content = obj;
                    }
                });
            }, function (err) {
                console.log(err);
            });
        }

        init();
    }


    angular.module('ezapp')
        .controller('LndPagesCtrl', ['$stateParams', 'request', LndPagesCtrl]);
})();
