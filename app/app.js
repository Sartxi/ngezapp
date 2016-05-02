'use strict';

var $stateProviderRef;
var $urlRouterProviderRef;

angular.module('ezapp', [
    'appFilters',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
    'ui.interceptors',
    'ui.utils',
    'angularUtils.directives.dirPagination',
    'ui.bootstrap',
    'backand',
    'ngStorage',
    'angular.filter'
])
.config(['$stateProvider','$httpProvider', '$urlRouterProvider', 'BackandProvider', '$locationProvider',
    function($stateProvider, $httpProvider, $urlRouterProvider, BackandProvider, $locationProvider) {
        BackandProvider.setAnonymousToken('dbfb7726-053c-4ddc-a3fb-eeb3f1831c30');
        $httpProvider.interceptors.push('httpInterceptor');
        $httpProvider.defaults.cache = true; //cache all requests
        $stateProviderRef = $stateProvider;
        $urlRouterProviderRef = $urlRouterProvider;
        $locationProvider.html5Mode(true);
    }
])

.run(['$rootScope', '$anchorScroll', '$location', '$state', '$urlRouter', 'StateService', 'StateFactory', '$log',
    function ($rootScope, $anchorScroll, $location, $state, $urlRouter, StateService, StateFactory, $log) {

        $rootScope.appLoading = true;
        var locationurl = $location.url();

        // Build application states
        StateService.dynamic().then(function (res) {
            // $log.debug(res);
            var stateMatch;

            // Static States
            $stateProviderRef
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl as vm',
                params: {
                    pageId: null
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl as vm',
                params: {
                    pageId: null
                }
            })
            .state('blog', {
                url: '/blog',
                title: 'Blog',
                templateUrl: 'views/blog.html',
                controller: 'BlogCtrl as vm',
                params: {
                    pageId: null
                }
            });

            // Dynamic States
            var newStates = StateFactory.create(res); // build-format states

            angular.forEach(newStates, function (state) {
                if (state.name) {
                    $stateProviderRef.state(state.name, state); // register state
                    if (state.url === locationurl) { stateMatch = true; $state.go(state.name); }
                }
                if (state.type === 'page') { // set pageID for pages content
                    var regstates = $state.get();
                    angular.forEach(regstates, function (r) {
                        if (r.url === state.url) {
                            r.params.pageId = state.pageId;
                        }
                    });
                }
            });

            // $log.debug($state.get());
            $urlRouter.sync();
            $urlRouter.listen();

            // check for static state and go where appropriate
            if (!stateMatch) {
                var currentStates = $state.get();
                var staticState = false;
                angular.forEach(currentStates, function (state) {
                    if (state.url === locationurl) {
                        staticState = true;
                    }
                });
                if (!staticState) {
                    $state.go('home');
                }
            }
            $rootScope.appLoading = false;
            $log.debug();

        }, function (err) {
            // do something when states service errors out
            console.log(err);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            StateService.setMeta(toState);
            StateService.setParams($state);
            $anchorScroll();
        });
    }
]);
