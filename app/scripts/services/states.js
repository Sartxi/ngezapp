'use strict';

(function () {

    function StateService(request, $q, $log, $state, $location, $rootScope) {

        var self = this;

        self.dynamic = function () {
            var defer = $q.defer();

            var enStates = function () {
                var q = $q.defer();
                request.name = 'enContent';
                request.getObjects().then(function (res) {
                    angular.forEach(res.data, function (obj) {
                        obj.lng = 'en';
                    });
                    q.resolve(res);
                });
                return q.promise;
            };
            var esStates = function () {
                var q = $q.defer();
                request.name = 'esContent';
                request.getObjects().then(function (res) {
                    angular.forEach(res.data, function (obj) {
                        obj.lng = 'es';
                    });
                    q.resolve(res);
                });
                return q.promise;
            };

            $q.all([enStates(), esStates()]).then(function (res) {
                var states = res[0].data.concat(res[1].data);
                defer.resolve(states);
            }, function (err) {
                defer.reject(err);
            });

			return defer.promise;
        };

        self.getPageId = function (url) {
            var url = $location.url();
            var states = $state.get();
            var pageId;
            angular.forEach(states, function (state) {
                if (state.url === url) {
                    pageId = state.params.pageId;
                }
            });
            return pageId;
        };

        self.setMeta = function (data) {
            $rootScope.pageInfo = {
                title: data.title,
                metaDesc: data.metaDescription,
                metaKeys: data.metaKeywords
            };
        };

        return self;

    }

    angular.module('ezadmin')
        .service('StateService', ['request', '$q', '$log', '$state', '$location', '$rootScope', StateService]);
}());
