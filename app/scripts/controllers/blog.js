'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:BlogCtrl
     * @description
     * # BlogCtrl
     * Blog controller of the ngezadmin
     */


    function BlogCtrl(request, $rootScope, PostFactory, $filter, $state) {
        var self = this;
        var language = $rootScope.stateInfo.language;

        function init() {
            self.loading = true;
            getPosts();
        }

        function getPosts() {
            request.name = 'blog';
            request.getObjects().then(function (res) {
                self.loading = false;
                self.posts = PostFactory.build(res.data, language);
                getCatagories();
            }, function (err) {
                console.log(err);
            });
        }

        function getCatagories() {
            request.name = 'blogCatagories';
            request.getObjects().then(function (res) {
                getTags();
                self.catagories = [];
                angular.forEach(res.data, function (cat) {
                    if (cat.language === language) {
                        self.catagories.push(cat.text);
                    }
                });
            }, function (err) {
                console.log(err);
            });
        }
        function getTags() {
            request.name = 'blogTags';
            request.getObjects().then(function (res) {
                self.tags = [];
                angular.forEach(res.data, function (cat) {
                    if (cat.language === language) {
                        self.tags.push(cat.text);
                    }
                });
            }, function (err) {
                console.log(err);
            });
        }

        self.setCat = function (cat) {
            if (self.selectedCatagory !== cat) {
                self.selectedCatagory = cat;
            } else {
                self.selectedCatagory = '';
            }
        };

        self.setTag = function (tag) {
            if (self.selectedTag !== tag) {
                self.selectedTag = tag;
            } else {
                self.selectedTag = '';
            }
        };

        self.readStory = function (post) {
            var id = post.id;
            $state.go('post' + id + language);
        };

        init();
    }

    function PostCtrl(request, $stateParams, $rootScope, $scope) {
        var self = this;
        var scope = $scope;

        var pageId = $rootScope.stateInfo.pageId;
        var language = $rootScope.stateInfo.language;

        function init() {
            self.loading = true;
            getContent();
        }

        function buildDisqus() {
            scope.disqusConfig = {
                disqus_shortname: 'financialfitnessblog',
                disqus_identifier: self.content.title,
                disqus_url: 'http://localhost:9001/' + self.content.url
            };
        }

        function getContent() {
            request.name = 'blog';
            request.getObject(pageId).then(function (res) {
                angular.forEach(res.content, function (obj) {
                    if (obj.language === language) {
                        self.content = obj;
                    }
                });
                self.loading = false;
                buildDisqus();
            }, function (err) {
                console.log(err);
            });
        }

        init();
    }


    angular.module('ezapp')
        .controller('BlogCtrl', ['request', '$rootScope', 'PostFactory', '$filter', '$state', BlogCtrl])
        .controller('PostCtrl', ['request', '$stateParams', '$rootScope', '$scope', PostCtrl]);
})();
