'use strict';

var $stateProviderRef;
var $urlRouterProviderRef;

angular.module('ezadmin', [
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
        BackandProvider.setAnonymousToken('ea0d2d74-72ae-4560-8b0f-241a783b313b');
        $httpProvider.interceptors.push('httpInterceptor');
        $stateProviderRef = $stateProvider;
        $urlRouterProviderRef = $urlRouterProvider;
        $locationProvider.html5Mode(true);
    }
])
.run(['$state', '$rootScope', '$location', '$anchorScroll', 'StateFactory', 'StateService', '$urlRouter',
    function ($state, $rootScope, $location, $anchorScroll, StateFactory, StateService, $urlRouter) {

        $rootScope.appLoading = true;
        var locationurl = $location.url();

        // Build application states
        StateService.dynamic().then(function (res) {
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
            .state('about', {
                url: '/about',
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

        }, function (err) {
            // do something when states service errors out
            console.log(err);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            var meta = {
                title: toState.title,
                metaDescription: toState.metaDescription,
                metaKeywords: toState.metaKeywords
            };
            StateService.setMeta(meta);
            $anchorScroll();
        });
    }
]);
