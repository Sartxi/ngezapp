'use strict';

(function () {

    function LanguageService($rootScope, $sessionStorage, $state, growl, $log) {

        var self = this;

        self.setLanguage = function () {
            if ($sessionStorage.language) {
                $rootScope.stateInfo.language = $sessionStorage.language;
            } else {
                $rootScope.stateInfo.language = 'en'; // english default
                $sessionStorage.language = 'en';
            }
        };

		self.check = function () {
			var language;
            var english = {
                lolo: 'Español',
                lolt: 'My Account',
                ltlo: 'Is Snap Right For Me?',
                ltlt: 'How it Works',
                ltlth: 'Finance Tips',
                ltlf: 'Become a Merchant',
                ltlfi: 'APPLY NOW',
                blogtitle: 'The Snap Blog',
                backBtn: 'Back'
            };
            var spanish = {
                lolo: 'English',
                lolt: 'Mi Cuenta',
                ltlo: 'Snap es adecuado para mí?',
                ltlt: 'Cómo Funciona',
                ltlth: 'Consejos de Finanzas',
                ltlf: 'Comerciante Convertido',
                ltlfi: 'APLICA YA',
                blogtitle: 'El Blog Snap',
                backBtn: 'Atrás'
            };

			var lngStore = $sessionStorage.language;

			if (lngStore) {
                if (lngStore === 'en') {
                    language = english;
                } else {
                    language = spanish;
                }
            } else {
                language = english;
            }
			return language;
		};

        self.toggle = function () {
            var session = $sessionStorage.language;
			var root = $rootScope.stateInfo.language;
			if (root === 'en') {
                root = 'es';
            } else {
                root = 'en';
            }
            $sessionStorage.language = root;
        };

		self.content = function (current) {
			var lngStore = $sessionStorage.language;
			var root = $rootScope.stateInfo.language;
			var stateExists;
			if (current.type) {
				var states = $state.get();
				angular.forEach(states, function (state) {
					if (state.type === current.type && state.params.pageId === current.params.pageId) {
						if (state.params.language === lngStore) {
							stateExists = true;
							$state.go(state); //head to state with same parent post or lndPage
						}
					}
				});
				if (!stateExists) {
					$sessionStorage.language = current.params.language;
					root = current.params.language;
					$rootScope.lngTag = self.check();
                    growl.add('info', 'Sorry there is no Spanish content for this page.', 3000);
				}
			} else {
				$state.go(current, {}, {reload: true}); //refresh static page for content
			}
		};

        return self;

    }

    angular.module('ezapp')
        .service('LanguageService', ['$rootScope', '$sessionStorage', '$state', 'growl', '$log', LanguageService]);
}());
