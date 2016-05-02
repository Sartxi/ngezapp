'use strict';

(function () {

    function PostFactory (PostService, $log) {

		var posts;

        posts = {
			build: function (posts, lng) {
				var newPosts = [];

                angular.forEach(posts, function (post) {
                    var newPost = post;
                    PostService.allPostData(post.id, lng).then(function (res) {
                        var html = res[0], cats = res[1], tags = res[2];
                        if (html[0]) {newPost.pageHtml = html[0].pageHtml;}
                        if (cats) {newPost.catagories = cats;}
                        if (tags) {newPost.tags = tags;}
                    });
                    newPosts.push(newPost);
                });

				return newPosts;
			}
		};

        return posts;

    }

    angular.module('ezapp')
        .factory('PostFactory', ['PostService', '$log', PostFactory]);
}());
