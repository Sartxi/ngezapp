'use strict';

(function () {

    function LanguageService($rootScope, $sessionStorage, $state, growl, $log, $window) {

        var self = this;

        self.setLanguage = function () {
            if ($sessionStorage.language) {
                $rootScope.stateInfo.language = $sessionStorage.language;
            } else {
                var userLang = $window.navigator.userLanguage || $window.navigator.language;
                if (userLang === 'es' || userLang === 'es-HN' || userLang === 'es-MX' || userLang === 'es-NI' || userLang === 'es-PA' || userLang === 'es-PY' || userLang === 'es-PE' || userLang === 'es-PR' || userLang === 'es-ES' || userLang === 'es-UY' || userLang === 'es-AR' || userLang === 'es-BO' || userLang === 'es-CL' || userLang === 'es-CO' || userLang === 'es-CR' || userLang === 'es-EC' || userLang === 'es-SV' || userLang === 'es-GT' || userLang === 'es-VE') {
                    $rootScope.stateInfo.language = 'es';
                    $sessionStorage.language = 'es';
                } else {
                    $rootScope.stateInfo.language = 'en';
                    $sessionStorage.language = 'en';
                }
            }
        };

		self.check = function () {
			var language;
            var english = {
                //CTA
                ctao: 'Get Approved!',
                ctat: 'Apply Now!',
                ctas: 'Submit',
                ctasu: 'Sign Up!',
                //menu
                lolo: 'Español',
                lolt: 'My Account',
                ltlo: 'Is Snap Right For Me?',
                ltlt: 'How it Works',
                ltlth: 'Finance Tips',
                ltlf: 'Become a Merchant',
                ltlfi: 'APPLY NOW',
                //hero - homePage
                hlo: 'UP TO $3000',
                hlt: 'NO CREDIT',
                hlth: 'NEEDED',
                hlfo: 'apply online',
                hlft: 'fast & easy',
                hlfth: '100 day cash pay-off',
                hbt: 'Get Approved!',
                //hero steps - homePage
                hsot: 'Apply',
                hsob: 'Just enter your info and you\'re on your way.',
                hstt: 'Approve',
                hstb: 'Get approved up to <strong>$3000</strong>.',
                hstht: 'Shop',
                hsthb: 'Find a Snap store near you and start shopping.',
                //info sections - homePage
                isot: 'Approval in a <strong>Snap!</strong>',
                istt: 'Up To 90% Approvals.<br><strong>Bad Credit, No Credit, OK!</strong>',
                istth: 'Finance <strong>up to $3000</strong> today, even after Bankruptcy.',
                //hero - merchantsPage
                mhlo: 'DON\'T LOSE SALES',
                mhlt: 'OFFER SNAP',
                mhlth: 'IN YOUR STORE',
                mhlfo: 'fast & easy',
                mhlft: 'no credit needed',
                mhlfth: '100 day cash pay-off',
                mhbt: 'Get Snap!',
                //hero steps - merchantsPage
                mhsot: 'Apply',
                mhsob: 'Just enter your info and you\'re on your way.',
                mhstt: 'Approve',
                mhstb: 'Get approved up to <strong>$3000</strong>.',
                mhstht: 'Shop',
                mhsthb: 'Find a Snap store near you and start shopping.',
                //info sections - merchantsPage
                misot: 'No Credit Financing =<br><strong>Increased Sales!</strong>',
                mistt: '<strong>Up To 90% Approvals.</strong><br> Up to $3000.',
                mistth: 'Customers get <strong>up to $3000.</strong><br>You get more sales.',
                //testimonials
                tscta: 'Learn how Snap Finance helped real customers to get financed for furniture, mattresses, tires, jewelry and more.',
                mtscta: 'Learn how Snap Finance helped real businesses like yours to grow.',
                //storeFinder
                sfsl: 'Find a store near you.',
                sfnl: 'Sign up to recieve updates on Financial Tips.',
                sfsb: 'Search',
                //blog
                blogtitle: 'Financial Fitness Blog',
                blogsub: 'Guidance from the professionals',
                readPost: 'Read More',
                backBtn: 'Back',
                //footer
                flo: 'Merchants',
                flt: 'Customers',
                flth: 'Company',
                flmo: 'How it Works',
                flmt: 'Is Snap Right for Me?',
                flmth: 'Testimonials',
                flmf: 'Apply',
                flmto: 'Customer Reviews',
                flmtt: 'Contact',
                flmtho: 'Overview',
                flmtht: 'The Team',
                flmthth: 'Terms of Use',
                flmthf: 'Privacy Policy',
                copyright: 'Copyright © 2016 Snap Finance | All Rights Reserved'
            };
            var spanish = {
                //add translations
            };

			var lngStore = $sessionStorage.language;

			if (lngStore) {
                if (lngStore === 'en') {
                    language = english;
                } else {
                    // language = spanish;
                    language = english;
                }
            } else {
                var userLang = $window.navigator.userLanguage || $window.navigator.language;
                if (userLang === 'es' || userLang === 'es-HN' || userLang === 'es-MX' || userLang === 'es-NI' || userLang === 'es-PA' || userLang === 'es-PY' || userLang === 'es-PE' || userLang === 'es-PR' || userLang === 'es-ES' || userLang === 'es-UY' || userLang === 'es-AR' || userLang === 'es-BO' || userLang === 'es-CL' || userLang === 'es-CO' || userLang === 'es-CR' || userLang === 'es-EC' || userLang === 'es-SV' || userLang === 'es-GT' || userLang === 'es-VE') {
                    language = spanish;
                } else {
                    language = english;
                }
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
        .service('LanguageService', ['$rootScope', '$sessionStorage', '$state', 'growl', '$log', '$window', LanguageService]);
}());
