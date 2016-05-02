'use strict';

(function() {

    /**
    * @ngdoc function
    * @name ezadmin.controller:HomeCtrl
    * @description
    * # HomeCtrl
    * HomeCtrl
    */

    function HomeCtrl($rootScope, request, StateService, $uibModal) {
        var self = this;
        var pageId = $rootScope.stateInfo.pageId;
        var language = $rootScope.stateInfo.language;

        function init() {
            self.activeTestimonial = 0;
            getContent();
            getTestimonials();
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

        function getTestimonials() {
            request.name = 'testimonials';
            request.getObjects().then(function (res) {
                self.testimonials = res.data;
                angular.forEach(self.testimonials, function (obj) {
                    if (language === 'es') {
                        obj.body = obj.esBody;
                    } else {
                        obj.body = obj.enBody;
                    }
                });
            }, function (err) {
                console.log(err);
            });
        }
        self.setTestimonial = function (index) {
            self.activeTestimonial = index;
        };
        self.activeTest = function (index) {
            return self.activeTestimonial === index;
        };

        self.watchVideoTestimonial = function (video) {
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

        init();
    }

    function VideoPlayCtrl($scope, $sce, video) {
        $scope.video = $sce.trustAsResourceUrl(video);
    }

    angular.module('ezapp')
        .controller('HomeCtrl', ['$rootScope', 'request', 'StateService', '$uibModal', HomeCtrl])
        .controller('VideoPlayCtrl', ['$scope', '$sce', 'video', VideoPlayCtrl]);
})();
