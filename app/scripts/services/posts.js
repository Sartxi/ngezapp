'use strict';

(function () {

    function PostService(request, $q) {

        var self = this;

		self.postDetails = function (id, lng) {
			var defer = $q.defer();

			var params = {
				params: {
					parameters: {
						id: id,
						lng: lng
					}
				}
			}
			request.name = 'posts';
			request.query(params).then(function (res) {
				defer.resolve(res);
			}, function (err) {
				defer.reject(err);
			});

			return defer.promise;
		};

		self.postCatagories = function (id, lng) {
			var defer = $q.defer();

			var params = {
				params: {
					parameters: {
						id: id,
						lng: lng
					}
				}
			}
			request.name = 'postCatagories';
			request.query(params).then(function (res) {
				defer.resolve(res);
			}, function (err) {
				defer.reject(err);
			});

			return defer.promise;
		};

		self.postTags = function (id, lng) {
			var defer = $q.defer();

			var params = {
				params: {
					parameters: {
						id: id,
						lng: lng
					}
				}
			}
			request.name = 'postTags';
			request.query(params).then(function (res) {
				defer.resolve(res);
			}, function (err) {
				defer.reject(err);
			});

			return defer.promise;
		};

		self.allPostData = function (id, lng) {
			var defer = $q.defer();

			var postsFn = function (data) {
				return data;
			}
			self.postCatagories(id, lng).then(postsFn);
			$q.all( [
				self.postDetails(id, lng).then(postsFn),
				self.postCatagories(id, lng).then(postsFn),
				self.postTags(id, lng).then(postsFn)
			]).then(function (res) {
				defer.resolve(res);
			}, function (err) {
				defer.reject(err);
			});

			return defer.promise;
		};

        return self;

    }

    angular.module('ezapp')
        .service('PostService', ['request', '$q', PostService]);
}());
