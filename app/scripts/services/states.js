'use strict';

(function () {

    function StateService(request, $q, $log, $state, $location, $rootScope, $sessionStorage, LanguageService) {

        var self = this;

        self.setMeta = function (data) {
            $rootScope.pageInfo = {
                title: data.title,
                metaDesc: data.metaDescription,
                metaKeys: data.metaKeywords
            };
        };

        self.setParams = function (state) {
            if (state.params.pageId) {
                $rootScope.stateInfo = $state.params;
                if ($sessionStorage.language && state.params.language !== $sessionStorage.language) {
                    $sessionStorage.language = state.params.language;
                    // $rootScope.lngTag = LanguageService.check();
                }
            } else {
                $rootScope.stateInfo = {};
                var pageId = self.getPageId();
                $rootScope.stateInfo.pageId = pageId;
                LanguageService.setLanguage();
            }
        };

        self.dynamic = function () {
            var defer = $q.defer();

            request.name = 'states';
            request.query().then(function (res) {
                defer.resolve(res);
            });

			return defer.promise;
        };

        self.getPageId = function () {
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

        return self;

    }

    angular.module('ezapp')
        .service('StateService', ['request', '$q', '$log', '$state', '$location', '$rootScope', '$sessionStorage', 'LanguageService', StateService]);
}());
