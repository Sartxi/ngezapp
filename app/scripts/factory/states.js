'use strict';

(function () {

    function StatesFactory ($log) {

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
                        } else {
                            state.url = obj.url.toLowerCase().replace(/ /g,'');
                        }

                        if (page) {
                            state.type = 'page';
                            state.pageId = page;
                        }

                        if (post) {
                            state.name = 'post' + post + obj.language;
                            state.type = 'post';
                            state.templateUrl = 'views/dynamic/blog.post.html';
                            state.params = {
                                pageId: post,
                                language: obj.language
                            }
                        }
                        if (lndpg) {
                            state.name = 'lnd' + lndpg + obj.language;
                            state.type = 'lndPage';
                            state.templateUrl = 'views/dynamic/lndpage.html';
                            state.params = {
                                pageId: lndpg,
                                language: obj.language
                            }
                            // $log.debug(state);
                        }
                        newStates.push(state);
					}
				});

				return newStates;
			}
		};

        return states;

    }

    angular.module('ezapp')
        .factory('StateFactory', ['$log', StatesFactory]);
}());
