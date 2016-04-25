'use strict';

(function () {

    function StatesFactory () {

		var states;

        states = {
			create: function (sts) {
				var newStates = [];

				angular.forEach(sts, function (obj) {
					if (obj) {
                        var page = obj.page;
						var post = obj.post;
						var lndpg = obj.lndPage;

                        var state = {
                            stateId: obj.id,
                            title: obj.title,
                            metaDescription: obj.metaDescription,
                            metaKeywords: obj.metaKeywords,
                            url: obj.url
                        };

                        if (!obj.url) {
                            var newurl = obj.title.toLowerCase().replace(/ /g,'-');
                            state.url = '/' + newurl;
                        }

                        if (page) {
                            state.type = 'page';
                            state.pageId = page;
                        }

                        if (post) {
                            state.name = 'post' + post + obj.lng;
                            state.type = 'post';
                            state.templateUrl = 'views/blog.post.html';
                            state.params = {
                                pageId: post,
                                language: obj.lng
                            }
                            console.log(state);
                        }
                        if (lndpg) {
                            state.name = 'lnd' + lndpg + obj.lng;
                            state.type = 'lndPage';
                            state.templateUrl = 'views/lndpage.html';
                            state.params = {
                                pageId: lndpg,
                                language: obj.lng
                            }
                        }
                        newStates.push(state);
					}
				});

				return newStates;
			}
		};

        return states;

    }

    angular.module('ezadmin')
        .factory('StateFactory', ['request', StatesFactory]);
}());
