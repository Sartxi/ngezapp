'use strict';

(function() {
    /**
     * @ngdoc function
     * @name ezadmin.controller:BlogCtrl
     * @description
     * # BlogCtrl
     * Blog controller of the ngezadmin
     */


    function BlogCtrl(request, $rootScope, PostFactory, $filter) {
        var self = this;
        var language = $rootScope.stateInfo.language;

        function init() {
            getPosts();
        }

        function getPosts() {
            request.name = 'blog';
            request.getObjects().then(function (res) {
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
        .controller('BlogCtrl', ['request', '$rootScope', 'PostFactory', '$filter', BlogCtrl])
        .controller('PostCtrl', ['request', '$stateParams', '$rootScope', PostCtrl]);
})();
