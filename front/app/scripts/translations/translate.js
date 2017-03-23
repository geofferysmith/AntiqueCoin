 'use strict';
  var en = require('./en');
  var ja = require('./ja');
  var zh = require('./zh');

 var translate = function($translateProvider) {
  $translateProvider.translations(en.code, translate.marked(en.data));
  $translateProvider.translations(ja.code, translate.marked(ja.data));
  $translateProvider.translations(zh.code, translate.marked(zh.data));
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);
 }

translate.marked = function(data) {
    var tData = data;
	for (var key in tData) if (tData.hasOwnProperty(key)) tData[key] = marked(tData[key]);
    return tData;
}
module.exports = translate;
