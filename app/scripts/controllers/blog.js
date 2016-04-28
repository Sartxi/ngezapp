'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:BlogCtrl
     * @description
     * # BlogCtrl
     * Blog controller of the ngezadmin
     */


    function BlogCtrl(request, $rootScope, PostFactory) {
        var self = this;
        var language = $rootScope.stateInfo.language;

        function init() {
            getPosts();
        }

        function getPosts() {
            request.name = 'blog';
            request.getObjects().then(function (res) {
                self.posts = PostFactory.build(res.data, language);
            }, function (err) {
                console.log(err);
            });
        }

        init();
    }

    function PostCtrl(request, $stateParams, $rootScope) {
        var self = this;

        var pageId = $rootScope.stateInfo.pageId;
        var language = $rootScope.stateInfo.language;

        function init() {
            getContent();
        }

        function getContent() {
            request.name = 'blog';
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
        .controller('BlogCtrl', ['request', '$rootScope', 'PostFactory', BlogCtrl])
        .controller('PostCtrl', ['request', '$stateParams', '$rootScope', PostCtrl]);
})();
