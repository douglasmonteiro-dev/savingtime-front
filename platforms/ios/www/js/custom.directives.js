(function() {
	'use strict';
	angular.
		module('custom-directives', [])
		.directive('autolinker', LinkerDirective);

	 	LinkerDirective.$inject = ['$rootScope', '$ionicPopup', '$timeout', '$compile'];
    	function LinkerDirective ($rootScope, $ionicPopup, $timeout, $compile) {

			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					$timeout(function() {
						var eleHtml = element.html();
						if (eleHtml === '') {
							return false;
						}

						function replaceAll(str, find, replace) {
							return str.replace(new RegExp(find, 'g'), replace);
						}

						var scheme;

						var replace = eleHtml.indexOf("https://") >=0? "maas360browsers://":"maas360browser://";
						var scheme = 'maas360browsers://';
						var nameAlert = 'Maas 360 Secure Browser'
						var boxScheme = 'boxemm://'

						var find = eleHtml.indexOf("https://") >= 0 ? "https://" : "http://";
						var findBiz = eleHtml.indexOf("boxemm://sharedlink?url=https://ibm.biz") >= 0 ? true: false;
						var findBox = eleHtml.indexOf("embed/preview") >= 0 ? true : false;
						$rootScope.rands = new Array();


						if(!findBox){
							eleHtml = replaceAll(eleHtml, find, replace);
						} else if (findBox) {
							var nameAlert = 'Box Emm';

							var text = eleHtml.split("https://app.box.com");

							element.html("");
							element.append(text[0]);
							for(var i=1; i < text.length; i++) {
							   var rand = parseInt(Math.random() * 10000);
								 $rootScope.rands.push(rand);
							   var pos = text[i].indexOf(" ");
							   pos = pos == -1 ? text[i].length : pos
							   var link = "https://app.box.com" + text[i].substring(0, pos);
								 var el = angular.element('<span/>');
							   var anchor = el.append('<a href id="link-box'+rand+'" class="img-link-box" data-content="'+ link +'" ng-click="loadFileBox(\''+link+'\')"> </a>');
								 $compile(el)($rootScope);
								 element.append(el);
								 element.append("&nbsp;" + text[i].substring(pos, text[i].length));
							}


						}
						if (findBiz) {
							eleHtml = replaceAll(eleHtml, findBiz, 'maas360browsers://ibm.biz');
						}

						var text = Autolinker.link(eleHtml, {
							className: 'autolinker',
							newWindow: true
						});

						if(!findBox){
							element.html(text);
						}


						var autolinks = element[0].getElementsByClassName('autolinker');

						for (var i = 0; i < autolinks.length; i++) {
							angular.element(autolinks[i]).bind('click', function(e) {
								var href = e.target.href;
								var url = e.srcElement.className.indexOf('url') >= 0;
								if (href) {
									window.plugins.launcher.launch({uri:href}, function(){}, function(){
										confirm(nameAlert+ ' is required to open this app outside IBM network - Will try to open on default browser');
										if(findBox){
											href = href.substr(24, href.length);
											window.open(href, '_blank');
											return true;
										} else {
											window.plugins.launcher.canLaunch({uri:scheme}, function() {
												window.open(href, '_blank');
												return true;
											}, function(){
												var strLeng = href.indexOf("maas360browsers://") >= 0? 18 : 0;
												href = href.substr(strLeng, href.length);
												href = "https://"+href;
												window.open(href, '_blank');
												return true;
											});
										}


									});
								}

								e.preventDefault();
								return false;
							});
						}
					}, 0);
				}
			}

		};
})();