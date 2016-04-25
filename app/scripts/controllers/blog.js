'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:BlogCtrl
     * @description
     * # BlogCtrl
     * Blog controller of the ngezadmin
     */


    function BlogCtrl(request) {
        var self = this;

        function init() {
            getPosts();
        }

        function getPosts() {
            request.name = 'blog';
            request.getObjects().then(function (res) {
                var posts = [];
                angular.forEach(res.data, function (post) {
                    if (post.active) {
                        posts.push(post);
                    }
                })
                self.posts = posts;
            }, function (err) {
                console.log(err);
            });
        }

        init();
    }

    function PostCtrl(request, $stateParams) {
        var self = this;

        var pageId = $stateParams.pageId;
        var language = $stateParams.language;

        function init() {
            getContent();
        }

        function getContent() {
            request.name = 'blog';
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
        .controller('BlogCtrl', ['request', BlogCtrl])
        .controller('PostCtrl', ['request', '$stateParams', PostCtrl]);
})();
