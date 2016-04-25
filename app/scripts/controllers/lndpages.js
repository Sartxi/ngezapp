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
                if (language) {
                    if (language === 'en') {
                        self.content = res.enContent[0];
                    } else if (language === 'es') {
                        self.content = res.esContent[0];
                    }
                } else {
                    self.content = res.enContent;
                }
            }, function (err) {
                console.log(err);
            });
        }

        init();
    }


    angular.module('ezadmin')
        .controller('LndPagesCtrl', ['$stateParams', 'request', LndPagesCtrl]);
})();
