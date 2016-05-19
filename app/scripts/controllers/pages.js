'use strict';

(function() {

    /**
    * @ngdoc function
    * @name ezadmin.controller:PagesCtrl
    * @description
    * # PagesCtrl
    * PagesCtrl
    */

    function PagesCtrl($rootScope, request, StateService, $uibModal, $timeout, $state) {
		var self = this;
        var pageId = $rootScope.stateInfo.pageId;
        var language = $rootScope.stateInfo.language;

        function init() {
            self.activeTestimonial = 0;
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

        self.watchVideo = function (video) {
            $uibModal.open({
                animation: true,
                size: 'lg',
                windowClass: 'normalModal',
                controller: 'VideoPlayCtrl',
                template: '<div class="modal-body"><iframe width="100%" height="400" ng-src="{{video}}" frameborder="0" allowfullscreen></iframe></div>',
                resolve: {
                    video: function () {
                        return video;
                    }
                }
            });
        };

        //finance Tips page
        self.seeTopics = function functionName(destination) {
            $state.go(destination);
        };

        init();
    }

    angular.module('ezapp')
        .controller('PagesCtrl', ['$rootScope', 'request', 'StateService', '$uibModal', '$timeout', '$state', PagesCtrl]);
})();
