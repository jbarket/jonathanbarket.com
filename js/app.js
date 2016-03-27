(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _TypeRotate = require('./modules/TypeRotate');

var _TypeRotate2 = _interopRequireDefault(_TypeRotate);

var _Timeline = require('./modules/Timeline');

var _Timeline2 = _interopRequireDefault(_Timeline);

var _smoothScroll = require('smooth-scroll');

var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TypeRotate2.default.init();
_smoothScroll2.default.init();

var timeline = new _Timeline2.default();

},{"./modules/Timeline":2,"./modules/TypeRotate":3,"smooth-scroll":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rainbowvis = require("rainbowvis.js");

var _rainbowvis2 = _interopRequireDefault(_rainbowvis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timeline = function () {
  function Timeline() {
    _classCallCheck(this, Timeline);

    this.events = document.querySelectorAll(".timeline");
    this.triggerOffset = 0.9;

    this.eventListeners();
    this.rainbow();
    this.showBlocks();
  }

  _createClass(Timeline, [{
    key: "offset",
    value: function offset(el) {
      var rect = el.getBoundingClientRect(),
          bodyEl = document.body;

      return {
        top: rect.top + bodyEl.scrollTop,
        left: rect.left + bodyEl.scrollLeft
      };
    }
  }, {
    key: "eventListeners",
    value: function eventListeners() {
      var _this = this;

      window.addEventListener("scroll", function (e) {
        if (!window.requestAnimationFrame) {
          setTimeout(function () {
            _this.showBlocks();
          }, 100);
        } else {
          window.requestAnimationFrame(function () {
            _this.showBlocks();
          });
        }
      });
    }
  }, {
    key: "showBlocks",
    value: function showBlocks(blocks, offset) {
      var _this2 = this;

      Array.from(this.events).forEach(function (event) {
        if (_this2.offset(event).top <= document.body.scrollTop + window.innerHeight * _this2.triggerOffset) {
          var img = event.querySelector(".timeline--img");
          var content = event.querySelector(".timeline--content");

          if (img.classList.contains("is-hidden")) {
            img.classList.remove("is-hidden");
            img.classList.add("bounce-in");
            content.classList.remove("is-hidden");
            content.classList.add("bounce-in");
          }
        }
      });
    }
  }, {
    key: "rainbow",
    value: function rainbow() {
      var rainbow = new _rainbowvis2.default();
      rainbow.setNumberRange(0, this.events.length - 1);
      rainbow.setSpectrum("#3498DB", "#BDC3C7");

      for (var i = 0; i < this.events.length; i++) {
        this.events[i].querySelector(".timeline--img").style.backgroundColor = "#" + rainbow.colourAt(i);

        var tags = this.events[i].querySelectorAll(".tags li");

        Array.from(tags).forEach(function (tag) {
          tag.style.backgroundColor = "#" + rainbow.colourAt(i);
        });
      }
    }
  }]);

  return Timeline;
}();

exports.default = Timeline;

},{"rainbowvis.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TypeRotate = function () {
  function TypeRotate(el, toRotate, period) {
    _classCallCheck(this, TypeRotate);

    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }

  _createClass(TypeRotate, [{
    key: 'tick',
    value: function tick() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 260 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    }
  }], [{
    key: 'init',
    value: function init() {
      var elements = document.getElementsByClassName('txt-rotate');
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TypeRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
    }
  }]);

  return TypeRotate;
}();

exports.default = TypeRotate;

},{}],4:[function(require,module,exports){
/*
RainbowVis-JS 
Released under Eclipse Public License - v 1.0
*/

function Rainbow()
{
	"use strict";
	var gradients = null;
	var minNum = 0;
	var maxNum = 100;
	var colours = ['ff0000', 'ffff00', '00ff00', '0000ff']; 
	setColours(colours);
	
	function setColours (spectrum) 
	{
		if (spectrum.length < 2) {
			throw new Error('Rainbow must have two or more colours.');
		} else {
			var increment = (maxNum - minNum)/(spectrum.length - 1);
			var firstGradient = new ColourGradient();
			firstGradient.setGradient(spectrum[0], spectrum[1]);
			firstGradient.setNumberRange(minNum, minNum + increment);
			gradients = [ firstGradient ];
			
			for (var i = 1; i < spectrum.length - 1; i++) {
				var colourGradient = new ColourGradient();
				colourGradient.setGradient(spectrum[i], spectrum[i + 1]);
				colourGradient.setNumberRange(minNum + increment * i, minNum + increment * (i + 1)); 
				gradients[i] = colourGradient; 
			}

			colours = spectrum;
		}
	}

	this.setSpectrum = function () 
	{
		setColours(arguments);
		return this;
	}

	this.setSpectrumByArray = function (array)
	{
		setColours(array);
		return this;
	}

	this.colourAt = function (number)
	{
		if (isNaN(number)) {
			throw new TypeError(number + ' is not a number');
		} else if (gradients.length === 1) {
			return gradients[0].colourAt(number);
		} else {
			var segment = (maxNum - minNum)/(gradients.length);
			var index = Math.min(Math.floor((Math.max(number, minNum) - minNum)/segment), gradients.length - 1);
			return gradients[index].colourAt(number);
		}
	}

	this.colorAt = this.colourAt;

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
			setColours(colours);
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
		return this;
	}
}

function ColourGradient() 
{
	"use strict";
	var startColour = 'ff0000';
	var endColour = '0000ff';
	var minNum = 0;
	var maxNum = 100;

	this.setGradient = function (colourStart, colourEnd)
	{
		startColour = getHexColour(colourStart);
		endColour = getHexColour(colourEnd);
	}

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
	}

	this.colourAt = function (number)
	{
		return calcHex(number, startColour.substring(0,2), endColour.substring(0,2)) 
			+ calcHex(number, startColour.substring(2,4), endColour.substring(2,4)) 
			+ calcHex(number, startColour.substring(4,6), endColour.substring(4,6));
	}
	
	function calcHex(number, channelStart_Base16, channelEnd_Base16)
	{
		var num = number;
		if (num < minNum) {
			num = minNum;
		}
		if (num > maxNum) {
			num = maxNum;
		} 
		var numRange = maxNum - minNum;
		var cStart_Base10 = parseInt(channelStart_Base16, 16);
		var cEnd_Base10 = parseInt(channelEnd_Base16, 16); 
		var cPerUnit = (cEnd_Base10 - cStart_Base10)/numRange;
		var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
		return formatHex(c_Base10.toString(16));
	}

	function formatHex(hex) 
	{
		if (hex.length === 1) {
			return '0' + hex;
		} else {
			return hex;
		}
	} 
	
	function isHexColour(string)
	{
		var regex = /^#?[0-9a-fA-F]{6}$/i;
		return regex.test(string);
	}

	function getHexColour(string)
	{
		if (isHexColour(string)) {
			return string.substring(string.length - 6, string.length);
		} else {
			var name = string.toLowerCase();
			if (colourNames.hasOwnProperty(name)) {
				return colourNames[name];
			}
			throw new Error(string + ' is not a valid colour.');
		}
	}
	
	// Extended list of CSS colornames s taken from
	// http://www.w3.org/TR/css3-color/#svg-color
	var colourNames = {
		aliceblue: "F0F8FF",
		antiquewhite: "FAEBD7",
		aqua: "00FFFF",
		aquamarine: "7FFFD4",
		azure: "F0FFFF",
		beige: "F5F5DC",
		bisque: "FFE4C4",
		black: "000000",
		blanchedalmond: "FFEBCD",
		blue: "0000FF",
		blueviolet: "8A2BE2",
		brown: "A52A2A",
		burlywood: "DEB887",
		cadetblue: "5F9EA0",
		chartreuse: "7FFF00",
		chocolate: "D2691E",
		coral: "FF7F50",
		cornflowerblue: "6495ED",
		cornsilk: "FFF8DC",
		crimson: "DC143C",
		cyan: "00FFFF",
		darkblue: "00008B",
		darkcyan: "008B8B",
		darkgoldenrod: "B8860B",
		darkgray: "A9A9A9",
		darkgreen: "006400",
		darkgrey: "A9A9A9",
		darkkhaki: "BDB76B",
		darkmagenta: "8B008B",
		darkolivegreen: "556B2F",
		darkorange: "FF8C00",
		darkorchid: "9932CC",
		darkred: "8B0000",
		darksalmon: "E9967A",
		darkseagreen: "8FBC8F",
		darkslateblue: "483D8B",
		darkslategray: "2F4F4F",
		darkslategrey: "2F4F4F",
		darkturquoise: "00CED1",
		darkviolet: "9400D3",
		deeppink: "FF1493",
		deepskyblue: "00BFFF",
		dimgray: "696969",
		dimgrey: "696969",
		dodgerblue: "1E90FF",
		firebrick: "B22222",
		floralwhite: "FFFAF0",
		forestgreen: "228B22",
		fuchsia: "FF00FF",
		gainsboro: "DCDCDC",
		ghostwhite: "F8F8FF",
		gold: "FFD700",
		goldenrod: "DAA520",
		gray: "808080",
		green: "008000",
		greenyellow: "ADFF2F",
		grey: "808080",
		honeydew: "F0FFF0",
		hotpink: "FF69B4",
		indianred: "CD5C5C",
		indigo: "4B0082",
		ivory: "FFFFF0",
		khaki: "F0E68C",
		lavender: "E6E6FA",
		lavenderblush: "FFF0F5",
		lawngreen: "7CFC00",
		lemonchiffon: "FFFACD",
		lightblue: "ADD8E6",
		lightcoral: "F08080",
		lightcyan: "E0FFFF",
		lightgoldenrodyellow: "FAFAD2",
		lightgray: "D3D3D3",
		lightgreen: "90EE90",
		lightgrey: "D3D3D3",
		lightpink: "FFB6C1",
		lightsalmon: "FFA07A",
		lightseagreen: "20B2AA",
		lightskyblue: "87CEFA",
		lightslategray: "778899",
		lightslategrey: "778899",
		lightsteelblue: "B0C4DE",
		lightyellow: "FFFFE0",
		lime: "00FF00",
		limegreen: "32CD32",
		linen: "FAF0E6",
		magenta: "FF00FF",
		maroon: "800000",
		mediumaquamarine: "66CDAA",
		mediumblue: "0000CD",
		mediumorchid: "BA55D3",
		mediumpurple: "9370DB",
		mediumseagreen: "3CB371",
		mediumslateblue: "7B68EE",
		mediumspringgreen: "00FA9A",
		mediumturquoise: "48D1CC",
		mediumvioletred: "C71585",
		midnightblue: "191970",
		mintcream: "F5FFFA",
		mistyrose: "FFE4E1",
		moccasin: "FFE4B5",
		navajowhite: "FFDEAD",
		navy: "000080",
		oldlace: "FDF5E6",
		olive: "808000",
		olivedrab: "6B8E23",
		orange: "FFA500",
		orangered: "FF4500",
		orchid: "DA70D6",
		palegoldenrod: "EEE8AA",
		palegreen: "98FB98",
		paleturquoise: "AFEEEE",
		palevioletred: "DB7093",
		papayawhip: "FFEFD5",
		peachpuff: "FFDAB9",
		peru: "CD853F",
		pink: "FFC0CB",
		plum: "DDA0DD",
		powderblue: "B0E0E6",
		purple: "800080",
		red: "FF0000",
		rosybrown: "BC8F8F",
		royalblue: "4169E1",
		saddlebrown: "8B4513",
		salmon: "FA8072",
		sandybrown: "F4A460",
		seagreen: "2E8B57",
		seashell: "FFF5EE",
		sienna: "A0522D",
		silver: "C0C0C0",
		skyblue: "87CEEB",
		slateblue: "6A5ACD",
		slategray: "708090",
		slategrey: "708090",
		snow: "FFFAFA",
		springgreen: "00FF7F",
		steelblue: "4682B4",
		tan: "D2B48C",
		teal: "008080",
		thistle: "D8BFD8",
		tomato: "FF6347",
		turquoise: "40E0D0",
		violet: "EE82EE",
		wheat: "F5DEB3",
		white: "FFFFFF",
		whitesmoke: "F5F5F5",
		yellow: "FFFF00",
		yellowgreen: "9ACD32"
	}
}

if (typeof module !== 'undefined') {
  module.exports = Rainbow;
}

},{}],5:[function(require,module,exports){
(function (global){
/*! smooth-scroll v9.1.1 | (c) 2016 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}("undefined"!=typeof global?global:this.window||this.global,function(e){"use strict";var t,n,r,o,a,c={},u="querySelector"in document&&"addEventListener"in e,i={selector:"[data-scroll]",selectorHeader:"[data-scroll-header]",speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callback:function(){}},l=function(){var e={},t=!1,n=0,r=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(var o=function(n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t&&"[object Object]"===Object.prototype.toString.call(n[r])?e[r]=l(!0,e[r],n[r]):e[r]=n[r])};r>n;n++){var a=arguments[n];o(a)}return e},s=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},f=function(e,t){var n,r,o=t.charAt(0),a="classList"in document.documentElement;for("["===o&&(t=t.substr(1,t.length-2),n=t.split("="),n.length>1&&(r=!0,n[1]=n[1].replace(/"/g,"").replace(/'/g,"")));e&&e!==document;e=e.parentNode){if("."===o)if(a){if(e.classList.contains(t.substr(1)))return e}else if(new RegExp("(^|\\s)"+t.substr(1)+"(\\s|$)").test(e.className))return e;if("#"===o&&e.id===t.substr(1))return e;if("["===o&&e.hasAttribute(n[0])){if(!r)return e;if(e.getAttribute(n[0])===n[1])return e}if(e.tagName.toLowerCase()===t)return e}return null};c.escapeCharacters=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),r=n.length,o=-1,a="",c=n.charCodeAt(0);++o<r;){if(t=n.charCodeAt(o),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&31>=t||127==t||0===o&&t>=48&&57>=t||1===o&&t>=48&&57>=t&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t?n.charAt(o):"\\"+n.charAt(o)}return"#"+a};var d=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},h=function(e,t,n){var r=0;if(e.offsetParent)do r+=e.offsetTop,e=e.offsetParent;while(e);return r=r-t-n,r>=0?r:0},m=function(){return Math.max(e.document.body.scrollHeight,e.document.documentElement.scrollHeight,e.document.body.offsetHeight,e.document.documentElement.offsetHeight,e.document.body.clientHeight,e.document.documentElement.clientHeight)},p=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},g=function(t,n){e.history.pushState&&(n||"true"===n)&&"file:"!==e.location.protocol&&e.history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))},b=function(e){return null===e?0:s(e)+e.offsetTop};c.animateScroll=function(n,c,u){var s=p(c?c.getAttribute("data-options"):null),f=l(t||i,u||{},s),v="[object Number]"===Object.prototype.toString.call(n)?!0:!1,y=v?null:"#"===n?e.document.documentElement:e.document.querySelector(n);if(v||y){var O=e.pageYOffset;r||(r=e.document.querySelector(f.selectorHeader)),o||(o=b(r));var S,I,H=v?n:h(y,o,parseInt(f.offset,10)),E=H-O,j=m(),C=0;v||g(n,f.updateURL);var L=function(t,r,o){var a=e.pageYOffset;(t==r||a==r||e.innerHeight+a>=j)&&(clearInterval(o),v||y.focus(),f.callback(n,c))},w=function(){C+=16,S=C/parseInt(f.speed,10),S=S>1?1:S,I=O+E*d(f.easing,S),e.scrollTo(0,Math.floor(I)),L(I,H,a)},A=function(){clearInterval(a),a=setInterval(w,16)};0===e.pageYOffset&&e.scrollTo(0,0),A()}};var v=function(e){if(0===e.button&&!e.metaKey&&!e.ctrlKey){var n=f(e.target,t.selector);if(n&&"a"===n.tagName.toLowerCase()){e.preventDefault();var r=c.escapeCharacters(n.hash);c.animateScroll(r,n,t)}}},y=function(e){n||(n=setTimeout(function(){n=null,o=b(r)},66))};return c.destroy=function(){t&&(e.document.removeEventListener("click",v,!1),e.removeEventListener("resize",y,!1),t=null,n=null,r=null,o=null,a=null)},c.init=function(n){u&&(c.destroy(),t=l(i,n||{}),r=e.document.querySelector(t.selectorHeader),o=b(r),e.document.addEventListener("click",v,!1),r&&e.addEventListener("resize",y,!1))},c});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL21vZHVsZXMvVGltZWxpbmUuanMiLCJhcHAvbW9kdWxlcy9UeXBlUm90YXRlLmpzIiwibm9kZV9tb2R1bGVzL3JhaW5ib3d2aXMuanMvcmFpbmJvd3Zpcy5qcyIsIm5vZGVfbW9kdWxlcy9zbW9vdGgtc2Nyb2xsL2Rpc3QvanMvc21vb3RoLXNjcm9sbC5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEscUJBQVcsSUFBWDtBQUNBLHVCQUFhLElBQWI7O0FBRUEsSUFBSSxXQUFXLHdCQUFYOzs7Ozs7Ozs7OztBQ1BKOzs7Ozs7OztJQUVNO0FBQ0osV0FESSxRQUNKLEdBQWM7MEJBRFYsVUFDVTs7QUFDWixTQUFLLE1BQUwsR0FBYyxTQUFTLGdCQUFULENBQTBCLFdBQTFCLENBQWQsQ0FEWTtBQUVaLFNBQUssYUFBTCxHQUFxQixHQUFyQixDQUZZOztBQUlaLFNBQUssY0FBTCxHQUpZO0FBS1osU0FBSyxPQUFMLEdBTFk7QUFNWixTQUFLLFVBQUwsR0FOWTtHQUFkOztlQURJOzsyQkFVRyxJQUFJO0FBQ1QsVUFBSSxPQUFPLEdBQUcscUJBQUgsRUFBUDtVQUFtQyxTQUFTLFNBQVMsSUFBVCxDQUR2Qzs7QUFHVCxhQUFPO0FBQ0wsYUFBSyxLQUFLLEdBQUwsR0FBVyxPQUFPLFNBQVA7QUFDaEIsY0FBTSxLQUFLLElBQUwsR0FBWSxPQUFPLFVBQVA7T0FGcEIsQ0FIUzs7OztxQ0FTTTs7O0FBRWYsYUFBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxVQUFDLENBQUQsRUFBTztBQUN2QyxZQUFJLENBQUMsT0FBTyxxQkFBUCxFQUE4QjtBQUNqQyxxQkFBVyxZQUFNO0FBQ2Ysa0JBQUssVUFBTCxHQURlO1dBQU4sRUFFUixHQUZILEVBRGlDO1NBQW5DLE1BS0s7QUFDSCxpQkFBTyxxQkFB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Q0FBZSxTQUFTLENBQVQsQ0FBZixFQUE0QixLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQTVCLEVBQWtELE1BQWxELEVBRFk7U0FBZDtPQUhGOzs7O1NBYkU7OztrQkFzRFM7OztBQ3REZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BUQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBUeXBlUm90YXRlIGZyb20gJy4vbW9kdWxlcy9UeXBlUm90YXRlJztcbmltcG9ydCBUaW1lbGluZSBmcm9tICcuL21vZHVsZXMvVGltZWxpbmUnO1xuaW1wb3J0IHNtb290aFNjcm9sbCBmcm9tICdzbW9vdGgtc2Nyb2xsJztcblxuVHlwZVJvdGF0ZS5pbml0KCk7XG5zbW9vdGhTY3JvbGwuaW5pdCgpO1xuXG5sZXQgdGltZWxpbmUgPSBuZXcgVGltZWxpbmUoKTtcbiIsImltcG9ydCBSYWluYm93IGZyb20gJ3JhaW5ib3d2aXMuanMnO1xuXG5jbGFzcyBUaW1lbGluZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZXZlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50aW1lbGluZVwiKTtcbiAgICB0aGlzLnRyaWdnZXJPZmZzZXQgPSAwLjk7XG5cbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzKCk7XG4gICAgdGhpcy5yYWluYm93KCk7XG4gICAgdGhpcy5zaG93QmxvY2tzKCk7XG4gIH1cblxuICBvZmZzZXQoZWwpIHtcbiAgICBsZXQgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBib2R5RWwgPSBkb2N1bWVudC5ib2R5O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogcmVjdC50b3AgKyBib2R5RWwuc2Nyb2xsVG9wLFxuICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgYm9keUVsLnNjcm9sbExlZnRcbiAgICB9O1xuICB9XG5cbiAgZXZlbnRMaXN0ZW5lcnMoKSB7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoZSkgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2hvd0Jsb2NrcygpO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2hvd0Jsb2NrcygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cblx0c2hvd0Jsb2NrcyhibG9ja3MsIG9mZnNldCkge1xuXG4gICAgQXJyYXkuZnJvbSh0aGlzLmV2ZW50cykuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLm9mZnNldChldmVudCkudG9wIDw9IChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCArIHdpbmRvdy5pbm5lckhlaWdodCAqIHRoaXMudHJpZ2dlck9mZnNldCkpIHtcbiAgICAgICAgbGV0IGltZyA9IGV2ZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZWxpbmUtLWltZ1wiKTtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBldmVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVsaW5lLS1jb250ZW50XCIpO1xuXG4gICAgICAgIGlmIChpbWcuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXMtaGlkZGVuXCIpKSB7XG4gICAgICAgICAgaW1nLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XG4gICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJib3VuY2UtaW5cIik7XG4gICAgICAgICAgY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtaGlkZGVuXCIpO1xuICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImJvdW5jZS1pblwiKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSk7XG5cblx0fVxuXG4gIHJhaW5ib3coKSB7XG4gICAgbGV0IHJhaW5ib3cgPSBuZXcgUmFpbmJvdygpO1xuICAgIHJhaW5ib3cuc2V0TnVtYmVyUmFuZ2UoMCwgdGhpcy5ldmVudHMubGVuZ3RoIC0gMSk7XG4gICAgcmFpbmJvdy5zZXRTcGVjdHJ1bShcIiMzNDk4REJcIiwgXCIjQkRDM0M3XCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5ldmVudHNbaV0ucXVlcnlTZWxlY3RvcihcIi50aW1lbGluZS0taW1nXCIpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI1wiICsgcmFpbmJvdy5jb2xvdXJBdChpKTtcblxuICAgICAgbGV0IHRhZ3MgPSB0aGlzLmV2ZW50c1tpXS5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhZ3MgbGlcIik7XG5cbiAgICAgIEFycmF5LmZyb20odGFncykuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICAgIHRhZy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNcIiArIHJhaW5ib3cuY29sb3VyQXQoaSk7XG4gICAgICB9KTtcblxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaW1lbGluZTtcbiIsImNsYXNzIFR5cGVSb3RhdGUge1xuICBjb25zdHJ1Y3RvcihlbCwgdG9Sb3RhdGUsIHBlcmlvZCkge1xuICAgIHRoaXMudG9Sb3RhdGUgPSB0b1JvdGF0ZTtcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy5sb29wTnVtID0gMDtcbiAgICB0aGlzLnBlcmlvZCA9IHBhcnNlSW50KHBlcmlvZCwgMTApIHx8IDIwMDA7XG4gICAgdGhpcy50eHQgPSAnJztcbiAgICB0aGlzLnRpY2soKTtcbiAgICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3R4dC1yb3RhdGUnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9Sb3RhdGUgPSBlbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm90YXRlJyk7XG4gICAgICB2YXIgcGVyaW9kID0gZWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmlvZCcpO1xuICAgICAgaWYgKHRvUm90YXRlKSB7XG4gICAgICAgIG5ldyBUeXBlUm90YXRlKGVsZW1lbnRzW2ldLCBKU09OLnBhcnNlKHRvUm90YXRlKSwgcGVyaW9kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aWNrKCkge1xuICAgIGxldCBpID0gdGhpcy5sb29wTnVtICUgdGhpcy50b1JvdGF0ZS5sZW5ndGg7XG4gICAgbGV0IGZ1bGxUeHQgPSB0aGlzLnRvUm90YXRlW2ldO1xuXG4gICAgaWYgKHRoaXMuaXNEZWxldGluZykge1xuICAgICAgdGhpcy50eHQgPSBmdWxsVHh0LnN1YnN0cmluZygwLCB0aGlzLnR4dC5sZW5ndGggLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50eHQgPSBmdWxsVHh0LnN1YnN0cmluZygwLCB0aGlzLnR4dC5sZW5ndGggKyAxKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cIndyYXBcIj4nK3RoaXMudHh0Kyc8L3NwYW4+JztcblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgZGVsdGEgPSAyNjAgLSBNYXRoLnJhbmRvbSgpICogMTAwO1xuXG4gICAgaWYgKHRoaXMuaXNEZWxldGluZykgeyBkZWx0YSAvPSAyOyB9XG5cbiAgICBpZiAoIXRoaXMuaXNEZWxldGluZyAmJiB0aGlzLnR4dCA9PT0gZnVsbFR4dCkge1xuICAgICAgZGVsdGEgPSB0aGlzLnBlcmlvZDtcbiAgICAgIHRoaXMuaXNEZWxldGluZyA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzRGVsZXRpbmcgJiYgdGhpcy50eHQgPT09ICcnKSB7XG4gICAgICB0aGlzLmlzRGVsZXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMubG9vcE51bSsrO1xuICAgICAgZGVsdGEgPSA1MDA7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHRoYXQudGljaygpO1xuICAgIH0sIGRlbHRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUeXBlUm90YXRlO1xuIiwiLypcblJhaW5ib3dWaXMtSlMgXG5SZWxlYXNlZCB1bmRlciBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIC0gdiAxLjBcbiovXG5cbmZ1bmN0aW9uIFJhaW5ib3coKVxue1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIGdyYWRpZW50cyA9IG51bGw7XG5cdHZhciBtaW5OdW0gPSAwO1xuXHR2YXIgbWF4TnVtID0gMTAwO1xuXHR2YXIgY29sb3VycyA9IFsnZmYwMDAwJywgJ2ZmZmYwMCcsICcwMGZmMDAnLCAnMDAwMGZmJ107IFxuXHRzZXRDb2xvdXJzKGNvbG91cnMpO1xuXHRcblx0ZnVuY3Rpb24gc2V0Q29sb3VycyAoc3BlY3RydW0pIFxuXHR7XG5cdFx0aWYgKHNwZWN0cnVtLmxlbmd0aCA8IDIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignUmFpbmJvdyBtdXN0IGhhdmUgdHdvIG9yIG1vcmUgY29sb3Vycy4nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGluY3JlbWVudCA9IChtYXhOdW0gLSBtaW5OdW0pLyhzcGVjdHJ1bS5sZW5ndGggLSAxKTtcblx0XHRcdHZhciBmaXJzdEdyYWRpZW50ID0gbmV3IENvbG91ckdyYWRpZW50KCk7XG5cdFx0XHRmaXJzdEdyYWRpZW50LnNldEdyYWRpZW50KHNwZWN0cnVtWzBdLCBzcGVjdHJ1bVsxXSk7XG5cdFx0XHRmaXJzdEdyYWRpZW50LnNldE51bWJlclJhbmdlKG1pbk51bSwgbWluTnVtICsgaW5jcmVtZW50KTtcblx0XHRcdGdyYWRpZW50cyA9IFsgZmlyc3RHcmFkaWVudCBdO1xuXHRcdFx0XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8IHNwZWN0cnVtLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHR2YXIgY29sb3VyR3JhZGllbnQgPSBuZXcgQ29sb3VyR3JhZGllbnQoKTtcblx0XHRcdFx0Y29sb3VyR3JhZGllbnQuc2V0R3JhZGllbnQoc3BlY3RydW1baV0sIHNwZWN0cnVtW2kgKyAxXSk7XG5cdFx0XHRcdGNvbG91ckdyYWRpZW50LnNldE51bWJlclJhbmdlKG1pbk51bSArIGluY3JlbWVudCAqIGksIG1pbk51bSArIGluY3JlbWVudCAqIChpICsgMSkpOyBcblx0XHRcdFx0Z3JhZGllbnRzW2ldID0gY29sb3VyR3JhZGllbnQ7IFxuXHRcdFx0fVxuXG5cdFx0XHRjb2xvdXJzID0gc3BlY3RydW07XG5cdFx0fVxuXHR9XG5cblx0dGhpcy5zZXRTcGVjdHJ1bSA9IGZ1bmN0aW9uICgpIFxuXHR7XG5cdFx0c2V0Q29sb3Vycyhhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dGhpcy5zZXRTcGVjdHJ1bUJ5QXJyYXkgPSBmdW5jdGlvbiAoYXJyYXkpXG5cdHtcblx0XHRzZXRDb2xvdXJzKGFycmF5KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRoaXMuY29sb3VyQXQgPSBmdW5jdGlvbiAobnVtYmVyKVxuXHR7XG5cdFx0aWYgKGlzTmFOKG51bWJlcikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IobnVtYmVyICsgJyBpcyBub3QgYSBudW1iZXInKTtcblx0XHR9IGVsc2UgaWYgKGdyYWRpZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHJldHVybiBncmFkaWVudHNbMF0uY29sb3VyQXQobnVtYmVyKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHNlZ21lbnQgPSAobWF4TnVtIC0gbWluTnVtKS8oZ3JhZGllbnRzLmxlbmd0aCk7XG5cdFx0XHR2YXIgaW5kZXggPSBNYXRoLm1pbihNYXRoLmZsb29yKChNYXRoLm1heChudW1iZXIsIG1pbk51bSkgLSBtaW5OdW0pL3NlZ21lbnQpLCBncmFkaWVudHMubGVuZ3RoIC0gMSk7XG5cdFx0XHRyZXR1cm4gZ3JhZGllbnRzW2luZGV4XS5jb2xvdXJBdChudW1iZXIpO1xuXHRcdH1cblx0fVxuXG5cdHRoaXMuY29sb3JBdCA9IHRoaXMuY29sb3VyQXQ7XG5cblx0dGhpcy5zZXROdW1iZXJSYW5nZSA9IGZ1bmN0aW9uIChtaW5OdW1iZXIsIG1heE51bWJlcilcblx0e1xuXHRcdGlmIChtYXhOdW1iZXIgPiBtaW5OdW1iZXIpIHtcblx0XHRcdG1pbk51bSA9IG1pbk51bWJlcjtcblx0XHRcdG1heE51bSA9IG1heE51bWJlcjtcblx0XHRcdHNldENvbG91cnMoY29sb3Vycyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdtYXhOdW1iZXIgKCcgKyBtYXhOdW1iZXIgKyAnKSBpcyBub3QgZ3JlYXRlciB0aGFuIG1pbk51bWJlciAoJyArIG1pbk51bWJlciArICcpJyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmZ1bmN0aW9uIENvbG91ckdyYWRpZW50KCkgXG57XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgc3RhcnRDb2xvdXIgPSAnZmYwMDAwJztcblx0dmFyIGVuZENvbG91ciA9ICcwMDAwZmYnO1xuXHR2YXIgbWluTnVtID0gMDtcblx0dmFyIG1heE51bSA9IDEwMDtcblxuXHR0aGlzLnNldEdyYWRpZW50ID0gZnVuY3Rpb24gKGNvbG91clN0YXJ0LCBjb2xvdXJFbmQpXG5cdHtcblx0XHRzdGFydENvbG91ciA9IGdldEhleENvbG91cihjb2xvdXJTdGFydCk7XG5cdFx0ZW5kQ29sb3VyID0gZ2V0SGV4Q29sb3VyKGNvbG91ckVuZCk7XG5cdH1cblxuXHR0aGlzLnNldE51bWJlclJhbmdlID0gZnVuY3Rpb24gKG1pbk51bWJlciwgbWF4TnVtYmVyKVxuXHR7XG5cdFx0aWYgKG1heE51bWJlciA+IG1pbk51bWJlcikge1xuXHRcdFx0bWluTnVtID0gbWluTnVtYmVyO1xuXHRcdFx0bWF4TnVtID0gbWF4TnVtYmVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcignbWF4TnVtYmVyICgnICsgbWF4TnVtYmVyICsgJykgaXMgbm90IGdyZWF0ZXIgdGhhbiBtaW5OdW1iZXIgKCcgKyBtaW5OdW1iZXIgKyAnKScpO1xuXHRcdH1cblx0fVxuXG5cdHRoaXMuY29sb3VyQXQgPSBmdW5jdGlvbiAobnVtYmVyKVxuXHR7XG5cdFx0cmV0dXJuIGNhbGNIZXgobnVtYmVyLCBzdGFydENvbG91ci5zdWJzdHJpbmcoMCwyKSwgZW5kQ29sb3VyLnN1YnN0cmluZygwLDIpKSBcblx0XHRcdCsgY2FsY0hleChudW1iZXIsIHN0YXJ0Q29sb3VyLnN1YnN0cmluZygyLDQpLCBlbmRDb2xvdXIuc3Vic3RyaW5nKDIsNCkpIFxuXHRcdFx0KyBjYWxjSGV4KG51bWJlciwgc3RhcnRDb2xvdXIuc3Vic3RyaW5nKDQsNiksIGVuZENvbG91ci5zdWJzdHJpbmcoNCw2KSk7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGNhbGNIZXgobnVtYmVyLCBjaGFubmVsU3RhcnRfQmFzZTE2LCBjaGFubmVsRW5kX0Jhc2UxNilcblx0e1xuXHRcdHZhciBudW0gPSBudW1iZXI7XG5cdFx0aWYgKG51bSA8IG1pbk51bSkge1xuXHRcdFx0bnVtID0gbWluTnVtO1xuXHRcdH1cblx0XHRpZiAobnVtID4gbWF4TnVtKSB7XG5cdFx0XHRudW0gPSBtYXhOdW07XG5cdFx0fSBcblx0XHR2YXIgbnVtUmFuZ2UgPSBtYXhOdW0gLSBtaW5OdW07XG5cdFx0dmFyIGNTdGFydF9CYXNlMTAgPSBwYXJzZUludChjaGFubmVsU3RhcnRfQmFzZTE2LCAxNik7XG5cdFx0dmFyIGNFbmRfQmFzZTEwID0gcGFyc2VJbnQoY2hhbm5lbEVuZF9CYXNlMTYsIDE2KTsgXG5cdFx0dmFyIGNQZXJVbml0ID0gKGNFbmRfQmFzZTEwIC0gY1N0YXJ0X0Jhc2UxMCkvbnVtUmFuZ2U7XG5cdFx0dmFyIGNfQmFzZTEwID0gTWF0aC5yb3VuZChjUGVyVW5pdCAqIChudW0gLSBtaW5OdW0pICsgY1N0YXJ0X0Jhc2UxMCk7XG5cdFx0cmV0dXJuIGZvcm1hdEhleChjX0Jhc2UxMC50b1N0cmluZygxNikpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZm9ybWF0SGV4KGhleCkgXG5cdHtcblx0XHRpZiAoaGV4Lmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0cmV0dXJuICcwJyArIGhleDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGhleDtcblx0XHR9XG5cdH0gXG5cdFxuXHRmdW5jdGlvbiBpc0hleENvbG91cihzdHJpbmcpXG5cdHtcblx0XHR2YXIgcmVnZXggPSAvXiM/WzAtOWEtZkEtRl17Nn0kL2k7XG5cdFx0cmV0dXJuIHJlZ2V4LnRlc3Qoc3RyaW5nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEhleENvbG91cihzdHJpbmcpXG5cdHtcblx0XHRpZiAoaXNIZXhDb2xvdXIoc3RyaW5nKSkge1xuXHRcdFx0cmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCAtIDYsIHN0cmluZy5sZW5ndGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbmFtZSA9IHN0cmluZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKGNvbG91ck5hbWVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRcdHJldHVybiBjb2xvdXJOYW1lc1tuYW1lXTtcblx0XHRcdH1cblx0XHRcdHRocm93IG5ldyBFcnJvcihzdHJpbmcgKyAnIGlzIG5vdCBhIHZhbGlkIGNvbG91ci4nKTtcblx0XHR9XG5cdH1cblx0XG5cdC8vIEV4dGVuZGVkIGxpc3Qgb2YgQ1NTIGNvbG9ybmFtZXMgcyB0YWtlbiBmcm9tXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtY29sb3IvI3N2Zy1jb2xvclxuXHR2YXIgY29sb3VyTmFtZXMgPSB7XG5cdFx0YWxpY2VibHVlOiBcIkYwRjhGRlwiLFxuXHRcdGFudGlxdWV3aGl0ZTogXCJGQUVCRDdcIixcblx0XHRhcXVhOiBcIjAwRkZGRlwiLFxuXHRcdGFxdWFtYXJpbmU6IFwiN0ZGRkQ0XCIsXG5cdFx0YXp1cmU6IFwiRjBGRkZGXCIsXG5cdFx0YmVpZ2U6IFwiRjVGNURDXCIsXG5cdFx0YmlzcXVlOiBcIkZGRTRDNFwiLFxuXHRcdGJsYWNrOiBcIjAwMDAwMFwiLFxuXHRcdGJsYW5jaGVkYWxtb25kOiBcIkZGRUJDRFwiLFxuXHRcdGJsdWU6IFwiMDAwMEZGXCIsXG5cdFx0Ymx1ZXZpb2xldDogXCI4QTJCRTJcIixcblx0XHRicm93bjogXCJBNTJBMkFcIixcblx0XHRidXJseXdvb2Q6IFwiREVCODg3XCIsXG5cdFx0Y2FkZXRibHVlOiBcIjVGOUVBMFwiLFxuXHRcdGNoYXJ0cmV1c2U6IFwiN0ZGRjAwXCIsXG5cdFx0Y2hvY29sYXRlOiBcIkQyNjkxRVwiLFxuXHRcdGNvcmFsOiBcIkZGN0Y1MFwiLFxuXHRcdGNvcm5mbG93ZXJibHVlOiBcIjY0OTVFRFwiLFxuXHRcdGNvcm5zaWxrOiBcIkZGRjhEQ1wiLFxuXHRcdGNyaW1zb246IFwiREMxNDNDXCIsXG5cdFx0Y3lhbjogXCIwMEZGRkZcIixcblx0XHRkYXJrYmx1ZTogXCIwMDAwOEJcIixcblx0XHRkYXJrY3lhbjogXCIwMDhCOEJcIixcblx0XHRkYXJrZ29sZGVucm9kOiBcIkI4ODYwQlwiLFxuXHRcdGRhcmtncmF5OiBcIkE5QTlBOVwiLFxuXHRcdGRhcmtncmVlbjogXCIwMDY0MDBcIixcblx0XHRkYXJrZ3JleTogXCJBOUE5QTlcIixcblx0XHRkYXJra2hha2k6IFwiQkRCNzZCXCIsXG5cdFx0ZGFya21hZ2VudGE6IFwiOEIwMDhCXCIsXG5cdFx0ZGFya29saXZlZ3JlZW46IFwiNTU2QjJGXCIsXG5cdFx0ZGFya29yYW5nZTogXCJGRjhDMDBcIixcblx0XHRkYXJrb3JjaGlkOiBcIjk5MzJDQ1wiLFxuXHRcdGRhcmtyZWQ6IFwiOEIwMDAwXCIsXG5cdFx0ZGFya3NhbG1vbjogXCJFOTk2N0FcIixcblx0XHRkYXJrc2VhZ3JlZW46IFwiOEZCQzhGXCIsXG5cdFx0ZGFya3NsYXRlYmx1ZTogXCI0ODNEOEJcIixcblx0XHRkYXJrc2xhdGVncmF5OiBcIjJGNEY0RlwiLFxuXHRcdGRhcmtzbGF0ZWdyZXk6IFwiMkY0RjRGXCIsXG5cdFx0ZGFya3R1cnF1b2lzZTogXCIwMENFRDFcIixcblx0XHRkYXJrdmlvbGV0OiBcIjk0MDBEM1wiLFxuXHRcdGRlZXBwaW5rOiBcIkZGMTQ5M1wiLFxuXHRcdGRlZXBza3libHVlOiBcIjAwQkZGRlwiLFxuXHRcdGRpbWdyYXk6IFwiNjk2OTY5XCIsXG5cdFx0ZGltZ3JleTogXCI2OTY5NjlcIixcblx0XHRkb2RnZXJibHVlOiBcIjFFOTBGRlwiLFxuXHRcdGZpcmVicmljazogXCJCMjIyMjJcIixcblx0XHRmbG9yYWx3aGl0ZTogXCJGRkZBRjBcIixcblx0XHRmb3Jlc3RncmVlbjogXCIyMjhCMjJcIixcblx0XHRmdWNoc2lhOiBcIkZGMDBGRlwiLFxuXHRcdGdhaW5zYm9ybzogXCJEQ0RDRENcIixcblx0XHRnaG9zdHdoaXRlOiBcIkY4RjhGRlwiLFxuXHRcdGdvbGQ6IFwiRkZENzAwXCIsXG5cdFx0Z29sZGVucm9kOiBcIkRBQTUyMFwiLFxuXHRcdGdyYXk6IFwiODA4MDgwXCIsXG5cdFx0Z3JlZW46IFwiMDA4MDAwXCIsXG5cdFx0Z3JlZW55ZWxsb3c6IFwiQURGRjJGXCIsXG5cdFx0Z3JleTogXCI4MDgwODBcIixcblx0XHRob25leWRldzogXCJGMEZGRjBcIixcblx0XHRob3RwaW5rOiBcIkZGNjlCNFwiLFxuXHRcdGluZGlhbnJlZDogXCJDRDVDNUNcIixcblx0XHRpbmRpZ286IFwiNEIwMDgyXCIsXG5cdFx0aXZvcnk6IFwiRkZGRkYwXCIsXG5cdFx0a2hha2k6IFwiRjBFNjhDXCIsXG5cdFx0bGF2ZW5kZXI6IFwiRTZFNkZBXCIsXG5cdFx0bGF2ZW5kZXJibHVzaDogXCJGRkYwRjVcIixcblx0XHRsYXduZ3JlZW46IFwiN0NGQzAwXCIsXG5cdFx0bGVtb25jaGlmZm9uOiBcIkZGRkFDRFwiLFxuXHRcdGxpZ2h0Ymx1ZTogXCJBREQ4RTZcIixcblx0XHRsaWdodGNvcmFsOiBcIkYwODA4MFwiLFxuXHRcdGxpZ2h0Y3lhbjogXCJFMEZGRkZcIixcblx0XHRsaWdodGdvbGRlbnJvZHllbGxvdzogXCJGQUZBRDJcIixcblx0XHRsaWdodGdyYXk6IFwiRDNEM0QzXCIsXG5cdFx0bGlnaHRncmVlbjogXCI5MEVFOTBcIixcblx0XHRsaWdodGdyZXk6IFwiRDNEM0QzXCIsXG5cdFx0bGlnaHRwaW5rOiBcIkZGQjZDMVwiLFxuXHRcdGxpZ2h0c2FsbW9uOiBcIkZGQTA3QVwiLFxuXHRcdGxpZ2h0c2VhZ3JlZW46IFwiMjBCMkFBXCIsXG5cdFx0bGlnaHRza3libHVlOiBcIjg3Q0VGQVwiLFxuXHRcdGxpZ2h0c2xhdGVncmF5OiBcIjc3ODg5OVwiLFxuXHRcdGxpZ2h0c2xhdGVncmV5OiBcIjc3ODg5OVwiLFxuXHRcdGxpZ2h0c3RlZWxibHVlOiBcIkIwQzRERVwiLFxuXHRcdGxpZ2h0eWVsbG93OiBcIkZGRkZFMFwiLFxuXHRcdGxpbWU6IFwiMDBGRjAwXCIsXG5cdFx0bGltZWdyZWVuOiBcIjMyQ0QzMlwiLFxuXHRcdGxpbmVuOiBcIkZBRjBFNlwiLFxuXHRcdG1hZ2VudGE6IFwiRkYwMEZGXCIsXG5cdFx0bWFyb29uOiBcIjgwMDAwMFwiLFxuXHRcdG1lZGl1bWFxdWFtYXJpbmU6IFwiNjZDREFBXCIsXG5cdFx0bWVkaXVtYmx1ZTogXCIwMDAwQ0RcIixcblx0XHRtZWRpdW1vcmNoaWQ6IFwiQkE1NUQzXCIsXG5cdFx0bWVkaXVtcHVycGxlOiBcIjkzNzBEQlwiLFxuXHRcdG1lZGl1bXNlYWdyZWVuOiBcIjNDQjM3MVwiLFxuXHRcdG1lZGl1bXNsYXRlYmx1ZTogXCI3QjY4RUVcIixcblx0XHRtZWRpdW1zcHJpbmdncmVlbjogXCIwMEZBOUFcIixcblx0XHRtZWRpdW10dXJxdW9pc2U6IFwiNDhEMUNDXCIsXG5cdFx0bWVkaXVtdmlvbGV0cmVkOiBcIkM3MTU4NVwiLFxuXHRcdG1pZG5pZ2h0Ymx1ZTogXCIxOTE5NzBcIixcblx0XHRtaW50Y3JlYW06IFwiRjVGRkZBXCIsXG5cdFx0bWlzdHlyb3NlOiBcIkZGRTRFMVwiLFxuXHRcdG1vY2Nhc2luOiBcIkZGRTRCNVwiLFxuXHRcdG5hdmFqb3doaXRlOiBcIkZGREVBRFwiLFxuXHRcdG5hdnk6IFwiMDAwMDgwXCIsXG5cdFx0b2xkbGFjZTogXCJGREY1RTZcIixcblx0XHRvbGl2ZTogXCI4MDgwMDBcIixcblx0XHRvbGl2ZWRyYWI6IFwiNkI4RTIzXCIsXG5cdFx0b3JhbmdlOiBcIkZGQTUwMFwiLFxuXHRcdG9yYW5nZXJlZDogXCJGRjQ1MDBcIixcblx0XHRvcmNoaWQ6IFwiREE3MEQ2XCIsXG5cdFx0cGFsZWdvbGRlbnJvZDogXCJFRUU4QUFcIixcblx0XHRwYWxlZ3JlZW46IFwiOThGQjk4XCIsXG5cdFx0cGFsZXR1cnF1b2lzZTogXCJBRkVFRUVcIixcblx0XHRwYWxldmlvbGV0cmVkOiBcIkRCNzA5M1wiLFxuXHRcdHBhcGF5YXdoaXA6IFwiRkZFRkQ1XCIsXG5cdFx0cGVhY2hwdWZmOiBcIkZGREFCOVwiLFxuXHRcdHBlcnU6IFwiQ0Q4NTNGXCIsXG5cdFx0cGluazogXCJGRkMwQ0JcIixcblx0XHRwbHVtOiBcIkREQTBERFwiLFxuXHRcdHBvd2RlcmJsdWU6IFwiQjBFMEU2XCIsXG5cdFx0cHVycGxlOiBcIjgwMDA4MFwiLFxuXHRcdHJlZDogXCJGRjAwMDBcIixcblx0XHRyb3N5YnJvd246IFwiQkM4RjhGXCIsXG5cdFx0cm95YWxibHVlOiBcIjQxNjlFMVwiLFxuXHRcdHNhZGRsZWJyb3duOiBcIjhCNDUxM1wiLFxuXHRcdHNhbG1vbjogXCJGQTgwNzJcIixcblx0XHRzYW5keWJyb3duOiBcIkY0QTQ2MFwiLFxuXHRcdHNlYWdyZWVuOiBcIjJFOEI1N1wiLFxuXHRcdHNlYXNoZWxsOiBcIkZGRjVFRVwiLFxuXHRcdHNpZW5uYTogXCJBMDUyMkRcIixcblx0XHRzaWx2ZXI6IFwiQzBDMEMwXCIsXG5cdFx0c2t5Ymx1ZTogXCI4N0NFRUJcIixcblx0XHRzbGF0ZWJsdWU6IFwiNkE1QUNEXCIsXG5cdFx0c2xhdGVncmF5OiBcIjcwODA5MFwiLFxuXHRcdHNsYXRlZ3JleTogXCI3MDgwOTBcIixcblx0XHRzbm93OiBcIkZGRkFGQVwiLFxuXHRcdHNwcmluZ2dyZWVuOiBcIjAwRkY3RlwiLFxuXHRcdHN0ZWVsYmx1ZTogXCI0NjgyQjRcIixcblx0XHR0YW46IFwiRDJCNDhDXCIsXG5cdFx0dGVhbDogXCIwMDgwODBcIixcblx0XHR0aGlzdGxlOiBcIkQ4QkZEOFwiLFxuXHRcdHRvbWF0bzogXCJGRjYzNDdcIixcblx0XHR0dXJxdW9pc2U6IFwiNDBFMEQwXCIsXG5cdFx0dmlvbGV0OiBcIkVFODJFRVwiLFxuXHRcdHdoZWF0OiBcIkY1REVCM1wiLFxuXHRcdHdoaXRlOiBcIkZGRkZGRlwiLFxuXHRcdHdoaXRlc21va2U6IFwiRjVGNUY1XCIsXG5cdFx0eWVsbG93OiBcIkZGRkYwMFwiLFxuXHRcdHllbGxvd2dyZWVuOiBcIjlBQ0QzMlwiXG5cdH1cbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gUmFpbmJvdztcbn1cbiIsIi8qISBzbW9vdGgtc2Nyb2xsIHY5LjEuMSB8IChjKSAyMDE2IENocmlzIEZlcmRpbmFuZGkgfCBNSVQgTGljZW5zZSB8IGh0dHA6Ly9naXRodWIuY29tL2NmZXJkaW5hbmRpL3Ntb290aC1zY3JvbGwgKi9cbiFmdW5jdGlvbihlLHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdChlKSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dChlKTplLnNtb290aFNjcm9sbD10KGUpfShcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDp0aGlzLndpbmRvd3x8dGhpcy5nbG9iYWwsZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQsbixyLG8sYSxjPXt9LHU9XCJxdWVyeVNlbGVjdG9yXCJpbiBkb2N1bWVudCYmXCJhZGRFdmVudExpc3RlbmVyXCJpbiBlLGk9e3NlbGVjdG9yOlwiW2RhdGEtc2Nyb2xsXVwiLHNlbGVjdG9ySGVhZGVyOlwiW2RhdGEtc2Nyb2xsLWhlYWRlcl1cIixzcGVlZDo1MDAsZWFzaW5nOlwiZWFzZUluT3V0Q3ViaWNcIixvZmZzZXQ6MCx1cGRhdGVVUkw6ITAsY2FsbGJhY2s6ZnVuY3Rpb24oKXt9fSxsPWZ1bmN0aW9uKCl7dmFyIGU9e30sdD0hMSxuPTAscj1hcmd1bWVudHMubGVuZ3RoO1wiW29iamVjdCBCb29sZWFuXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50c1swXSkmJih0PWFyZ3VtZW50c1swXSxuKyspO2Zvcih2YXIgbz1mdW5jdGlvbihuKXtmb3IodmFyIHIgaW4gbilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobixyKSYmKHQmJlwiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobltyXSk/ZVtyXT1sKCEwLGVbcl0sbltyXSk6ZVtyXT1uW3JdKX07cj5uO24rKyl7dmFyIGE9YXJndW1lbnRzW25dO28oYSl9cmV0dXJuIGV9LHM9ZnVuY3Rpb24oZSl7cmV0dXJuIE1hdGgubWF4KGUuc2Nyb2xsSGVpZ2h0LGUub2Zmc2V0SGVpZ2h0LGUuY2xpZW50SGVpZ2h0KX0sZj1mdW5jdGlvbihlLHQpe3ZhciBuLHIsbz10LmNoYXJBdCgwKSxhPVwiY2xhc3NMaXN0XCJpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7Zm9yKFwiW1wiPT09byYmKHQ9dC5zdWJzdHIoMSx0Lmxlbmd0aC0yKSxuPXQuc3BsaXQoXCI9XCIpLG4ubGVuZ3RoPjEmJihyPSEwLG5bMV09blsxXS5yZXBsYWNlKC9cIi9nLFwiXCIpLnJlcGxhY2UoLycvZyxcIlwiKSkpO2UmJmUhPT1kb2N1bWVudDtlPWUucGFyZW50Tm9kZSl7aWYoXCIuXCI9PT1vKWlmKGEpe2lmKGUuY2xhc3NMaXN0LmNvbnRhaW5zKHQuc3Vic3RyKDEpKSlyZXR1cm4gZX1lbHNlIGlmKG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIit0LnN1YnN0cigxKStcIihcXFxcc3wkKVwiKS50ZXN0KGUuY2xhc3NOYW1lKSlyZXR1cm4gZTtpZihcIiNcIj09PW8mJmUuaWQ9PT10LnN1YnN0cigxKSlyZXR1cm4gZTtpZihcIltcIj09PW8mJmUuaGFzQXR0cmlidXRlKG5bMF0pKXtpZighcilyZXR1cm4gZTtpZihlLmdldEF0dHJpYnV0ZShuWzBdKT09PW5bMV0pcmV0dXJuIGV9aWYoZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk9PT10KXJldHVybiBlfXJldHVybiBudWxsfTtjLmVzY2FwZUNoYXJhY3RlcnM9ZnVuY3Rpb24oZSl7XCIjXCI9PT1lLmNoYXJBdCgwKSYmKGU9ZS5zdWJzdHIoMSkpO2Zvcih2YXIgdCxuPVN0cmluZyhlKSxyPW4ubGVuZ3RoLG89LTEsYT1cIlwiLGM9bi5jaGFyQ29kZUF0KDApOysrbzxyOyl7aWYodD1uLmNoYXJDb2RlQXQobyksMD09PXQpdGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyOiB0aGUgaW5wdXQgY29udGFpbnMgVSswMDAwLlwiKTthKz10Pj0xJiYzMT49dHx8MTI3PT10fHwwPT09byYmdD49NDgmJjU3Pj10fHwxPT09byYmdD49NDgmJjU3Pj10JiY0NT09PWM/XCJcXFxcXCIrdC50b1N0cmluZygxNikrXCIgXCI6dD49MTI4fHw0NT09PXR8fDk1PT09dHx8dD49NDgmJjU3Pj10fHx0Pj02NSYmOTA+PXR8fHQ+PTk3JiYxMjI+PXQ/bi5jaGFyQXQobyk6XCJcXFxcXCIrbi5jaGFyQXQobyl9cmV0dXJuXCIjXCIrYX07dmFyIGQ9ZnVuY3Rpb24oZSx0KXt2YXIgbjtyZXR1cm5cImVhc2VJblF1YWRcIj09PWUmJihuPXQqdCksXCJlYXNlT3V0UXVhZFwiPT09ZSYmKG49dCooMi10KSksXCJlYXNlSW5PdXRRdWFkXCI9PT1lJiYobj0uNT50PzIqdCp0Oi0xKyg0LTIqdCkqdCksXCJlYXNlSW5DdWJpY1wiPT09ZSYmKG49dCp0KnQpLFwiZWFzZU91dEN1YmljXCI9PT1lJiYobj0tLXQqdCp0KzEpLFwiZWFzZUluT3V0Q3ViaWNcIj09PWUmJihuPS41PnQ/NCp0KnQqdDoodC0xKSooMip0LTIpKigyKnQtMikrMSksXCJlYXNlSW5RdWFydFwiPT09ZSYmKG49dCp0KnQqdCksXCJlYXNlT3V0UXVhcnRcIj09PWUmJihuPTEtIC0tdCp0KnQqdCksXCJlYXNlSW5PdXRRdWFydFwiPT09ZSYmKG49LjU+dD84KnQqdCp0KnQ6MS04Ki0tdCp0KnQqdCksXCJlYXNlSW5RdWludFwiPT09ZSYmKG49dCp0KnQqdCp0KSxcImVhc2VPdXRRdWludFwiPT09ZSYmKG49MSstLXQqdCp0KnQqdCksXCJlYXNlSW5PdXRRdWludFwiPT09ZSYmKG49LjU+dD8xNip0KnQqdCp0KnQ6MSsxNiotLXQqdCp0KnQqdCksbnx8dH0saD1mdW5jdGlvbihlLHQsbil7dmFyIHI9MDtpZihlLm9mZnNldFBhcmVudClkbyByKz1lLm9mZnNldFRvcCxlPWUub2Zmc2V0UGFyZW50O3doaWxlKGUpO3JldHVybiByPXItdC1uLHI+PTA/cjowfSxtPWZ1bmN0aW9uKCl7cmV0dXJuIE1hdGgubWF4KGUuZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsZS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LGUuZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsZS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGUuZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsZS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KX0scD1mdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJvYmplY3RcIj09dHlwZW9mIEpTT04mJlwiZnVuY3Rpb25cIj09dHlwZW9mIEpTT04ucGFyc2U/SlNPTi5wYXJzZShlKTp7fX0sZz1mdW5jdGlvbih0LG4pe2UuaGlzdG9yeS5wdXNoU3RhdGUmJihufHxcInRydWVcIj09PW4pJiZcImZpbGU6XCIhPT1lLmxvY2F0aW9uLnByb3RvY29sJiZlLmhpc3RvcnkucHVzaFN0YXRlKG51bGwsbnVsbCxbZS5sb2NhdGlvbi5wcm90b2NvbCxcIi8vXCIsZS5sb2NhdGlvbi5ob3N0LGUubG9jYXRpb24ucGF0aG5hbWUsZS5sb2NhdGlvbi5zZWFyY2gsdF0uam9pbihcIlwiKSl9LGI9ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGw9PT1lPzA6cyhlKStlLm9mZnNldFRvcH07Yy5hbmltYXRlU2Nyb2xsPWZ1bmN0aW9uKG4sYyx1KXt2YXIgcz1wKGM/Yy5nZXRBdHRyaWJ1dGUoXCJkYXRhLW9wdGlvbnNcIik6bnVsbCksZj1sKHR8fGksdXx8e30scyksdj1cIltvYmplY3QgTnVtYmVyXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG4pPyEwOiExLHk9dj9udWxsOlwiI1wiPT09bj9lLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDplLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobik7aWYodnx8eSl7dmFyIE89ZS5wYWdlWU9mZnNldDtyfHwocj1lLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZi5zZWxlY3RvckhlYWRlcikpLG98fChvPWIocikpO3ZhciBTLEksSD12P246aCh5LG8scGFyc2VJbnQoZi5vZmZzZXQsMTApKSxFPUgtTyxqPW0oKSxDPTA7dnx8ZyhuLGYudXBkYXRlVVJMKTt2YXIgTD1mdW5jdGlvbih0LHIsbyl7dmFyIGE9ZS5wYWdlWU9mZnNldDsodD09cnx8YT09cnx8ZS5pbm5lckhlaWdodCthPj1qKSYmKGNsZWFySW50ZXJ2YWwobyksdnx8eS5mb2N1cygpLGYuY2FsbGJhY2sobixjKSl9LHc9ZnVuY3Rpb24oKXtDKz0xNixTPUMvcGFyc2VJbnQoZi5zcGVlZCwxMCksUz1TPjE/MTpTLEk9TytFKmQoZi5lYXNpbmcsUyksZS5zY3JvbGxUbygwLE1hdGguZmxvb3IoSSkpLEwoSSxILGEpfSxBPWZ1bmN0aW9uKCl7Y2xlYXJJbnRlcnZhbChhKSxhPXNldEludGVydmFsKHcsMTYpfTswPT09ZS5wYWdlWU9mZnNldCYmZS5zY3JvbGxUbygwLDApLEEoKX19O3ZhciB2PWZ1bmN0aW9uKGUpe2lmKDA9PT1lLmJ1dHRvbiYmIWUubWV0YUtleSYmIWUuY3RybEtleSl7dmFyIG49ZihlLnRhcmdldCx0LnNlbGVjdG9yKTtpZihuJiZcImFcIj09PW4udGFnTmFtZS50b0xvd2VyQ2FzZSgpKXtlLnByZXZlbnREZWZhdWx0KCk7dmFyIHI9Yy5lc2NhcGVDaGFyYWN0ZXJzKG4uaGFzaCk7Yy5hbmltYXRlU2Nyb2xsKHIsbix0KX19fSx5PWZ1bmN0aW9uKGUpe258fChuPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtuPW51bGwsbz1iKHIpfSw2NikpfTtyZXR1cm4gYy5kZXN0cm95PWZ1bmN0aW9uKCl7dCYmKGUuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdiwhMSksZS5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIseSwhMSksdD1udWxsLG49bnVsbCxyPW51bGwsbz1udWxsLGE9bnVsbCl9LGMuaW5pdD1mdW5jdGlvbihuKXt1JiYoYy5kZXN0cm95KCksdD1sKGksbnx8e30pLHI9ZS5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQuc2VsZWN0b3JIZWFkZXIpLG89YihyKSxlLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHYsITEpLHImJmUuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHksITEpKX0sY30pOyJdfQ==
