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
                // CTA
                ctao: 'Get Approved!',
                ctat: 'Apply Now!',
                //menu
                lolo: 'Español',
                lolt: 'My Account',
                ltlo: 'Is Snap Right For Me?',
                ltlt: 'How it Works',
                ltlth: 'Finance Tips',
                ltlf: 'Become a Merchant',
                ltlfi: 'APPLY NOW',
                //hero
                hlo: 'UP TO $3000',
                hlt: 'NO CREDIT',
                hlth: 'NEEDED',
                hlfo: 'apply online',
                hlft: 'fast & easy',
                hlfth: '100 day cash pay-off',
                hbt: 'Get Approved!',
                //hero steps
                hsot: 'Apply',
                hsob: 'Just enter your info and you\'re on your way.',
                hstt: 'Approve',
                hstb: 'Get approved up to $3000.',
                hstht: 'Shop',
                hsthb: 'Find a Snap store near you and start shopping.',
                //info sections - homePage
                isot: 'Approval in a',
                istt: 'Up To 90% Approvals.',
                istth: 'Bad Credit, No Credit, OK!',
                isttho: 'Finance',
                isttht: 'up to $3000',
                istthth: 'today, even after Bankruptcy.',
                //testimonials
                tscta: 'Learn how Snap Finance helped real customers to get financed for furniture, mattresses, tires, jewelry and more.',
                //storeFinder
                sfsl: 'Find a store near you.',
                sfsb: 'Search',
                //blog
                blogtitle: 'The Snap Blog',
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
                // CTA
                ctao: 'Consigue Aprobado!',
                ctat: 'Aplica ya!',
                //menu
                lolo: 'English',
                lolt: 'Mi Cuenta',
                ltlo: 'Snap es adecuado para mí?',
                ltlt: 'Cómo Funciona',
                ltlth: 'Consejos de Finanzas',
                ltlf: 'Comerciante Convertido',
                ltlfi: 'APLICA YA',
                //hero
                hlo: 'HASTA $3000',
                hlt: 'SIN CRÉDITO',
                hlth: 'NECESARIO',
                hlfo: 'aplica online',
                hlft: 'rápido y fácil',
                hlfth: '100 días de efectivo pago de compensación',
                hbt: 'Consigue Aprobado!',
                //hero steps
                hsot: 'Aplica',
                hsob: 'Solo tienes que introducir su información y usted está en su camino.',
                hstt: 'Aprobar',
                hstb: 'Obtener la aprobación hasta $3000.',
                hstht: 'Tienda',
                hsthb: 'Encuentra una tienda cerca de usted Snap y empezar a comprar.',
                //info sections - homePage
                isot: 'La aprobación de una',
                istt: 'Hasta el 90% Aprobaciones.',
                istth: 'Mal crédito, sin crédito, OK!',
                isttho: 'Financiar',
                isttht: 'hasta $3000',
                istthth: 'hoy en día, incluso después de la bancarrota.',
                //testimonials
                tscta: 'Aprender cómo Snap Finanzas ayudó a los clientes reales para obtener financiamiento para muebles, colchones, neumáticos, joyería y más.',
                //storeFinder
                sfsl: 'Encuentra una tienda cerca de ti.',
                sfsb: 'Buscar',
                //blog
                blogtitle: 'El Blog Snap',
                backBtn: 'Atrás',
                //footer
                flo: 'Comerciantes',
                flt: 'Clientes',
                flth: 'Empresa',
                flmo: 'Cómo Funciona',
                flmt: 'Snap es adecuado para mí?',
                flmth: 'Testimonios',
                flmf: 'Aplica',
                flmto: 'Opiniones',
                flmtt: 'Contacto',
                flmtho: 'Visión',
                flmtht: 'El Equipo',
                flmthth: 'Términos de Uso',
                flmthf: 'Política de Privacidad',
                copyright: 'Copyright © 2016 Snap Finanzas | Todos los derechos reservados'
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
