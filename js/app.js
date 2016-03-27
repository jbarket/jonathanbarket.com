(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _TypeRotate = require('./modules/TypeRotate');

var _TypeRotate2 = _interopRequireDefault(_TypeRotate);

var _Timeline = require('./modules/Timeline');

var _Timeline2 = _interopRequireDefault(_Timeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TypeRotate2.default.init();

var timeline = new _Timeline2.default();

},{"./modules/Timeline":2,"./modules/TypeRotate":3}],2:[function(require,module,exports){
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
    this.circles = document.querySelectorAll(".timeline--img");
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
      rainbow.setNumberRange(0, this.circles.length - 1);
      rainbow.setSpectrum("#3498DB", "#BDC3C7");

      for (var i = 0; i < this.circles.length; i++) {
        this.circles[i].style.backgroundColor = "#" + rainbow.colourAt(i);
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
      var delta = 300 - Math.random() * 100;

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL21vZHVsZXMvVGltZWxpbmUuanMiLCJhcHAvbW9kdWxlcy9UeXBlUm90YXRlLmpzIiwibm9kZV9tb2R1bGVzL3JhaW5ib3d2aXMuanMvcmFpbmJvd3Zpcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEscUJBQVcsSUFBWDs7QUFFQSxJQUFJLFdBQVcsd0JBQVg7Ozs7Ozs7Ozs7O0FDTEo7Ozs7Ozs7O0lBRU07QUFDSixXQURJLFFBQ0osR0FBYzswQkFEVixVQUNVOztBQUNaLFNBQUssTUFBTCxHQUFjLFNBQVMsZ0JBQVQsQ0FBMEIsV0FBMUIsQ0FBZCxDQURZO0FBRVosU0FBSyxPQUFMLEdBQWUsU0FBUyxnQkFBVCxDQUEwQixnQkFBMUIsQ0FBZixDQUZZO0FBR1osU0FBSyxhQUFMLEdBQXFCLEdBQXJCLENBSFk7O0FBS1osU0FBSyxjQUFMLEdBTFk7QUFNWixTQUFLLE9BQUwsR0FOWTtBQU9aLFNBQUssVUFBTCxHQVBZO0dBQWQ7O2VBREk7OzJCQVdHLElBQUk7QUFDVCxVQUFJLE9BQU8sR0FBRyxxQkFBSCxFQUFQO1VBQW1DLFNBQVMsU0FBUyxJQUFULENBRHZDOztBQUdULGFBQU87QUFDTCxhQUFLLEtBQUssR0FBTCxHQUFXLE9BQU8sU0FBUDtBQUNoQixjQUFNLEtBQUssSUFBTCxHQUFZLE9BQU8sVUFBUDtPQUZwQixDQUhTOzs7O3FDQVNNOzs7QUFFZixhQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQUMsQ0FBRCxFQUFPO0FBQ3ZDLFlBQUksQ0FBQyxPQUFPLHFCQUFQLEVBQThCO0FBQ2pDLHFCQUFXLFlBQU07QUFDZixrQkFBSyxVQUFMLEdBRGU7V0FBTixFQUVSLEdBRkgsRUFEaUM7U0FBbkMsTUFLSztBQUNILGlCQUFPLHFCQUFQLENBQTZCLFlBQU07QUFDakMsa0JBQUssVUFBTCxHQURpQztXQUFOLENBQTdCLENBREc7U0FMTDtPQURnQyxDQUFsQyxDQUZlOzs7OytCQWlCUCxRQUFRLFFBQVE7OztBQUV4QixZQUFNLElBQU4sQ0FBVyxLQUFLLE1BQUwsQ0FBWCxDQUF3QixPQUF4QixDQUFnQyxVQUFDLEtBQUQsRUFBVztBQUN6QyxZQUFJLE9BQUssTUFBTCxDQUFZLEtBQVosRUFBbUIsR0FBbkIsSUFBMkIsU0FBUyxJQUFULENBQWMsU0FBZCxHQUEwQixPQUFPLFdBQVAsR0FBcUIsT0FBSyxhQUFMLEVBQXFCO0FBQ2pHLGNBQUksTUFBTSxNQUFNLGFBQU4sQ0FBb0IsZ0JBQXBCLENBQU4sQ0FENkY7QUFFakcsY0FBSSxVQUFVLE1BQU0sYUFBTixDQUFvQixvQkFBcEIsQ0FBVixDQUY2Rjs7QUFJakcsY0FBSSxJQUFJLFNBQUosQ0FBYyxRQUFkLENBQXVCLFdBQXZCLENBQUosRUFBeUM7QUFDdkMsZ0JBQUksU0FBSixDQUFjLE1BQWQsQ0FBcUIsV0FBckIsRUFEdUM7QUFFdkMsZ0JBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsV0FBbEIsRUFGdUM7QUFHdkMsb0JBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixXQUF6QixFQUh1QztBQUl2QyxvQkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFdBQXRCLEVBSnVDO1dBQXpDO1NBSkY7T0FEOEIsQ0FBaEMsQ0FGd0I7Ozs7OEJBbUJoQjtBQUNSLFVBQUksVUFBVSwwQkFBVixDQURJO0FBRVIsY0FBUSxjQUFSLENBQXVCLENBQXZCLEVBQTBCLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsQ0FBdEIsQ0FBMUIsQ0FGUTtBQUdSLGNBQVEsV0FBUixDQUFvQixTQUFwQixFQUErQixTQUEvQixFQUhROztBQUtSLFdBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBcUIsR0FBekMsRUFBOEM7QUFDNUMsYUFBSyxPQUFMLENBQWEsQ0FBYixFQUFnQixLQUFoQixDQUFzQixlQUF0QixHQUF3QyxNQUFNLFFBQVEsUUFBUixDQUFpQixDQUFqQixDQUFOLENBREk7T0FBOUM7Ozs7U0E3REU7OztrQkFtRVM7Ozs7Ozs7Ozs7Ozs7SUNyRVQ7QUFDSixXQURJLFVBQ0osQ0FBWSxFQUFaLEVBQWdCLFFBQWhCLEVBQTBCLE1BQTFCLEVBQWtDOzBCQUQ5QixZQUM4Qjs7QUFDaEMsU0FBSyxRQUFMLEdBQWdCLFFBQWhCLENBRGdDO0FBRWhDLFNBQUssRUFBTCxHQUFVLEVBQVYsQ0FGZ0M7QUFHaEMsU0FBSyxPQUFMLEdBQWUsQ0FBZixDQUhnQztBQUloQyxTQUFLLE1BQUwsR0FBYyxTQUFTLE1BQVQsRUFBaUIsRUFBakIsS0FBd0IsSUFBeEIsQ0FKa0I7QUFLaEMsU0FBSyxHQUFMLEdBQVcsRUFBWCxDQUxnQztBQU1oQyxTQUFLLElBQUwsR0FOZ0M7QUFPaEMsU0FBSyxVQUFMLEdBQWtCLEtBQWxCLENBUGdDO0dBQWxDOztlQURJOzsyQkFzQkc7QUFDTCxVQUFJLElBQUksS0FBSyxPQUFMLEdBQWUsS0FBSyxRQUFMLENBQWMsTUFBZCxDQURsQjtBQUVMLFVBQUksVUFBVSxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVYsQ0FGQzs7QUFJTCxVQUFJLEtBQUssVUFBTCxFQUFpQjtBQUNuQixhQUFLLEdBQUwsR0FBVyxRQUFRLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUIsS0FBSyxHQUFMLENBQVMsTUFBVCxHQUFrQixDQUFsQixDQUFoQyxDQURtQjtPQUFyQixNQUVPO0FBQ0wsYUFBSyxHQUFMLEdBQVcsUUFBUSxTQUFSLENBQWtCLENBQWxCLEVBQXFCLEtBQUssR0FBTCxDQUFTLE1BQVQsR0FBa0IsQ0FBbEIsQ0FBaEMsQ0FESztPQUZQOztBQU1BLFdBQUssRUFBTCxDQUFRLFNBQVIsR0FBb0Isd0JBQXNCLEtBQUssR0FBTCxHQUFTLFNBQS9CLENBVmY7O0FBWUwsVUFBSSxPQUFPLElBQVAsQ0FaQztBQWFMLFVBQUksUUFBUSxNQUFNLEtBQUssTUFBTCxLQUFnQixHQUFoQixDQWJiOztBQWVMLFVBQUksS0FBSyxVQUFMLEVBQWlCO0FBQUUsaUJBQVMsQ0FBVCxDQUFGO09BQXJCOztBQUVBLFVBQUksQ0FBQyxLQUFLLFVBQUwsSUFBbUIsS0FBSyxHQUFMLEtBQWEsT0FBYixFQUFzQjtBQUM1QyxnQkFBUSxLQUFLLE1BQUwsQ0FEb0M7QUFFNUMsYUFBSyxVQUFMLEdBQWtCLElBQWxCLENBRjRDO09BQTlDLE1BR08sSUFBSSxLQUFLLFVBQUwsSUFBbUIsS0FBSyxHQUFMLEtBQWEsRUFBYixFQUFpQjtBQUM3QyxhQUFLLFVBQUwsR0FBa0IsS0FBbEIsQ0FENkM7QUFFN0MsYUFBSyxPQUFMLEdBRjZDO0FBRzdDLGdCQUFRLEdBQVIsQ0FINkM7T0FBeEM7O0FBTVAsaUJBQVcsWUFBVztBQUNwQixhQUFLLElBQUwsR0FEb0I7T0FBWCxFQUVSLEtBRkgsRUExQks7Ozs7MkJBWE87QUFDWixVQUFJLFdBQVcsU0FBUyxzQkFBVCxDQUFnQyxZQUFoQyxDQUFYLENBRFE7QUFFWixXQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxTQUFTLE1BQVQsRUFBaUIsR0FBckMsRUFBMEM7QUFDeEMsWUFBSSxXQUFXLFNBQVMsQ0FBVCxFQUFZLFlBQVosQ0FBeUIsYUFBekIsQ0FBWCxDQURvQztBQUV4QyxZQUFJLFNBQVMsU0FBUyxDQUFULEVBQVksWUFBWixDQUF5QixhQUF6QixDQUFULENBRm9DO0FBR3hDLFlBQUksUUFBSixFQUFjO0FBQ1osY0FBSSxVQUFKLENBQWUsU0FBUyxDQUFULENBQWYsRUFBNEIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUE1QixFQUFrRCxNQUFsRCxFQURZO1NBQWQ7T0FIRjs7OztTQWJFOzs7a0JBc0RTOzs7QUN0RGY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBUeXBlUm90YXRlIGZyb20gJy4vbW9kdWxlcy9UeXBlUm90YXRlJztcbmltcG9ydCBUaW1lbGluZSBmcm9tICcuL21vZHVsZXMvVGltZWxpbmUnO1xuXG5UeXBlUm90YXRlLmluaXQoKTtcblxubGV0IHRpbWVsaW5lID0gbmV3IFRpbWVsaW5lKCk7XG4iLCJpbXBvcnQgUmFpbmJvdyBmcm9tICdyYWluYm93dmlzLmpzJztcblxuY2xhc3MgVGltZWxpbmUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmV2ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGltZWxpbmVcIik7XG4gICAgdGhpcy5jaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50aW1lbGluZS0taW1nXCIpO1xuICAgIHRoaXMudHJpZ2dlck9mZnNldCA9IDAuOTtcblxuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLnJhaW5ib3coKTtcbiAgICB0aGlzLnNob3dCbG9ja3MoKTtcbiAgfVxuXG4gIG9mZnNldChlbCkge1xuICAgIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGJvZHlFbCA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiByZWN0LnRvcCArIGJvZHlFbC5zY3JvbGxUb3AsXG4gICAgICBsZWZ0OiByZWN0LmxlZnQgKyBib2R5RWwuc2Nyb2xsTGVmdFxuICAgIH07XG4gIH1cblxuICBldmVudExpc3RlbmVycygpIHtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIChlKSA9PiB7XG4gICAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zaG93QmxvY2tzKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zaG93QmxvY2tzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuXHRzaG93QmxvY2tzKGJsb2Nrcywgb2Zmc2V0KSB7XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuZXZlbnRzKS5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMub2Zmc2V0KGV2ZW50KS50b3AgPD0gKGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wICsgd2luZG93LmlubmVySGVpZ2h0ICogdGhpcy50cmlnZ2VyT2Zmc2V0KSkge1xuICAgICAgICBsZXQgaW1nID0gZXZlbnQucXVlcnlTZWxlY3RvcihcIi50aW1lbGluZS0taW1nXCIpO1xuICAgICAgICBsZXQgY29udGVudCA9IGV2ZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZWxpbmUtLWNvbnRlbnRcIik7XG5cbiAgICAgICAgaWYgKGltZy5jbGFzc0xpc3QuY29udGFpbnMoXCJpcy1oaWRkZW5cIikpIHtcbiAgICAgICAgICBpbWcuY2xhc3NMaXN0LnJlbW92ZShcImlzLWhpZGRlblwiKTtcbiAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImJvdW5jZS1pblwiKTtcbiAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XG4gICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKFwiYm91bmNlLWluXCIpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9KTtcblxuXHR9XG5cbiAgcmFpbmJvdygpIHtcbiAgICBsZXQgcmFpbmJvdyA9IG5ldyBSYWluYm93KCk7XG4gICAgcmFpbmJvdy5zZXROdW1iZXJSYW5nZSgwLCB0aGlzLmNpcmNsZXMubGVuZ3RoIC0gMSk7XG4gICAgcmFpbmJvdy5zZXRTcGVjdHJ1bShcIiMzNDk4REJcIiwgXCIjQkRDM0M3XCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNpcmNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuY2lyY2xlc1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNcIiArIHJhaW5ib3cuY29sb3VyQXQoaSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbWVsaW5lO1xuIiwiY2xhc3MgVHlwZVJvdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKGVsLCB0b1JvdGF0ZSwgcGVyaW9kKSB7XG4gICAgdGhpcy50b1JvdGF0ZSA9IHRvUm90YXRlO1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLmxvb3BOdW0gPSAwO1xuICAgIHRoaXMucGVyaW9kID0gcGFyc2VJbnQocGVyaW9kLCAxMCkgfHwgMjAwMDtcbiAgICB0aGlzLnR4dCA9ICcnO1xuICAgIHRoaXMudGljaygpO1xuICAgIHRoaXMuaXNEZWxldGluZyA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgbGV0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHh0LXJvdGF0ZScpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0b1JvdGF0ZSA9IGVsZW1lbnRzW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3RhdGUnKTtcbiAgICAgIHZhciBwZXJpb2QgPSBlbGVtZW50c1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyaW9kJyk7XG4gICAgICBpZiAodG9Sb3RhdGUpIHtcbiAgICAgICAgbmV3IFR5cGVSb3RhdGUoZWxlbWVudHNbaV0sIEpTT04ucGFyc2UodG9Sb3RhdGUpLCBwZXJpb2QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgbGV0IGkgPSB0aGlzLmxvb3BOdW0gJSB0aGlzLnRvUm90YXRlLmxlbmd0aDtcbiAgICBsZXQgZnVsbFR4dCA9IHRoaXMudG9Sb3RhdGVbaV07XG5cbiAgICBpZiAodGhpcy5pc0RlbGV0aW5nKSB7XG4gICAgICB0aGlzLnR4dCA9IGZ1bGxUeHQuc3Vic3RyaW5nKDAsIHRoaXMudHh0Lmxlbmd0aCAtIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnR4dCA9IGZ1bGxUeHQuc3Vic3RyaW5nKDAsIHRoaXMudHh0Lmxlbmd0aCArIDEpO1xuICAgIH1cblxuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwid3JhcFwiPicrdGhpcy50eHQrJzwvc3Bhbj4nO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBkZWx0YSA9IDMwMCAtIE1hdGgucmFuZG9tKCkgKiAxMDA7XG5cbiAgICBpZiAodGhpcy5pc0RlbGV0aW5nKSB7IGRlbHRhIC89IDI7IH1cblxuICAgIGlmICghdGhpcy5pc0RlbGV0aW5nICYmIHRoaXMudHh0ID09PSBmdWxsVHh0KSB7XG4gICAgICBkZWx0YSA9IHRoaXMucGVyaW9kO1xuICAgICAgdGhpcy5pc0RlbGV0aW5nID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNEZWxldGluZyAmJiB0aGlzLnR4dCA9PT0gJycpIHtcbiAgICAgIHRoaXMuaXNEZWxldGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5sb29wTnVtKys7XG4gICAgICBkZWx0YSA9IDUwMDtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdGhhdC50aWNrKCk7XG4gICAgfSwgZGVsdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFR5cGVSb3RhdGU7XG4iLCIvKlxuUmFpbmJvd1Zpcy1KUyBcblJlbGVhc2VkIHVuZGVyIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgLSB2IDEuMFxuKi9cblxuZnVuY3Rpb24gUmFpbmJvdygpXG57XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgZ3JhZGllbnRzID0gbnVsbDtcblx0dmFyIG1pbk51bSA9IDA7XG5cdHZhciBtYXhOdW0gPSAxMDA7XG5cdHZhciBjb2xvdXJzID0gWydmZjAwMDAnLCAnZmZmZjAwJywgJzAwZmYwMCcsICcwMDAwZmYnXTsgXG5cdHNldENvbG91cnMoY29sb3Vycyk7XG5cdFxuXHRmdW5jdGlvbiBzZXRDb2xvdXJzIChzcGVjdHJ1bSkgXG5cdHtcblx0XHRpZiAoc3BlY3RydW0ubGVuZ3RoIDwgMikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdSYWluYm93IG11c3QgaGF2ZSB0d28gb3IgbW9yZSBjb2xvdXJzLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgaW5jcmVtZW50ID0gKG1heE51bSAtIG1pbk51bSkvKHNwZWN0cnVtLmxlbmd0aCAtIDEpO1xuXHRcdFx0dmFyIGZpcnN0R3JhZGllbnQgPSBuZXcgQ29sb3VyR3JhZGllbnQoKTtcblx0XHRcdGZpcnN0R3JhZGllbnQuc2V0R3JhZGllbnQoc3BlY3RydW1bMF0sIHNwZWN0cnVtWzFdKTtcblx0XHRcdGZpcnN0R3JhZGllbnQuc2V0TnVtYmVyUmFuZ2UobWluTnVtLCBtaW5OdW0gKyBpbmNyZW1lbnQpO1xuXHRcdFx0Z3JhZGllbnRzID0gWyBmaXJzdEdyYWRpZW50IF07XG5cdFx0XHRcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDwgc3BlY3RydW0ubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdHZhciBjb2xvdXJHcmFkaWVudCA9IG5ldyBDb2xvdXJHcmFkaWVudCgpO1xuXHRcdFx0XHRjb2xvdXJHcmFkaWVudC5zZXRHcmFkaWVudChzcGVjdHJ1bVtpXSwgc3BlY3RydW1baSArIDFdKTtcblx0XHRcdFx0Y29sb3VyR3JhZGllbnQuc2V0TnVtYmVyUmFuZ2UobWluTnVtICsgaW5jcmVtZW50ICogaSwgbWluTnVtICsgaW5jcmVtZW50ICogKGkgKyAxKSk7IFxuXHRcdFx0XHRncmFkaWVudHNbaV0gPSBjb2xvdXJHcmFkaWVudDsgXG5cdFx0XHR9XG5cblx0XHRcdGNvbG91cnMgPSBzcGVjdHJ1bTtcblx0XHR9XG5cdH1cblxuXHR0aGlzLnNldFNwZWN0cnVtID0gZnVuY3Rpb24gKCkgXG5cdHtcblx0XHRzZXRDb2xvdXJzKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0aGlzLnNldFNwZWN0cnVtQnlBcnJheSA9IGZ1bmN0aW9uIChhcnJheSlcblx0e1xuXHRcdHNldENvbG91cnMoYXJyYXkpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dGhpcy5jb2xvdXJBdCA9IGZ1bmN0aW9uIChudW1iZXIpXG5cdHtcblx0XHRpZiAoaXNOYU4obnVtYmVyKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihudW1iZXIgKyAnIGlzIG5vdCBhIG51bWJlcicpO1xuXHRcdH0gZWxzZSBpZiAoZ3JhZGllbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0cmV0dXJuIGdyYWRpZW50c1swXS5jb2xvdXJBdChudW1iZXIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgc2VnbWVudCA9IChtYXhOdW0gLSBtaW5OdW0pLyhncmFkaWVudHMubGVuZ3RoKTtcblx0XHRcdHZhciBpbmRleCA9IE1hdGgubWluKE1hdGguZmxvb3IoKE1hdGgubWF4KG51bWJlciwgbWluTnVtKSAtIG1pbk51bSkvc2VnbWVudCksIGdyYWRpZW50cy5sZW5ndGggLSAxKTtcblx0XHRcdHJldHVybiBncmFkaWVudHNbaW5kZXhdLmNvbG91ckF0KG51bWJlcik7XG5cdFx0fVxuXHR9XG5cblx0dGhpcy5jb2xvckF0ID0gdGhpcy5jb2xvdXJBdDtcblxuXHR0aGlzLnNldE51bWJlclJhbmdlID0gZnVuY3Rpb24gKG1pbk51bWJlciwgbWF4TnVtYmVyKVxuXHR7XG5cdFx0aWYgKG1heE51bWJlciA+IG1pbk51bWJlcikge1xuXHRcdFx0bWluTnVtID0gbWluTnVtYmVyO1xuXHRcdFx0bWF4TnVtID0gbWF4TnVtYmVyO1xuXHRcdFx0c2V0Q29sb3Vycyhjb2xvdXJzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ21heE51bWJlciAoJyArIG1heE51bWJlciArICcpIGlzIG5vdCBncmVhdGVyIHRoYW4gbWluTnVtYmVyICgnICsgbWluTnVtYmVyICsgJyknKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZnVuY3Rpb24gQ29sb3VyR3JhZGllbnQoKSBcbntcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBzdGFydENvbG91ciA9ICdmZjAwMDAnO1xuXHR2YXIgZW5kQ29sb3VyID0gJzAwMDBmZic7XG5cdHZhciBtaW5OdW0gPSAwO1xuXHR2YXIgbWF4TnVtID0gMTAwO1xuXG5cdHRoaXMuc2V0R3JhZGllbnQgPSBmdW5jdGlvbiAoY29sb3VyU3RhcnQsIGNvbG91ckVuZClcblx0e1xuXHRcdHN0YXJ0Q29sb3VyID0gZ2V0SGV4Q29sb3VyKGNvbG91clN0YXJ0KTtcblx0XHRlbmRDb2xvdXIgPSBnZXRIZXhDb2xvdXIoY29sb3VyRW5kKTtcblx0fVxuXG5cdHRoaXMuc2V0TnVtYmVyUmFuZ2UgPSBmdW5jdGlvbiAobWluTnVtYmVyLCBtYXhOdW1iZXIpXG5cdHtcblx0XHRpZiAobWF4TnVtYmVyID4gbWluTnVtYmVyKSB7XG5cdFx0XHRtaW5OdW0gPSBtaW5OdW1iZXI7XG5cdFx0XHRtYXhOdW0gPSBtYXhOdW1iZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdtYXhOdW1iZXIgKCcgKyBtYXhOdW1iZXIgKyAnKSBpcyBub3QgZ3JlYXRlciB0aGFuIG1pbk51bWJlciAoJyArIG1pbk51bWJlciArICcpJyk7XG5cdFx0fVxuXHR9XG5cblx0dGhpcy5jb2xvdXJBdCA9IGZ1bmN0aW9uIChudW1iZXIpXG5cdHtcblx0XHRyZXR1cm4gY2FsY0hleChudW1iZXIsIHN0YXJ0Q29sb3VyLnN1YnN0cmluZygwLDIpLCBlbmRDb2xvdXIuc3Vic3RyaW5nKDAsMikpIFxuXHRcdFx0KyBjYWxjSGV4KG51bWJlciwgc3RhcnRDb2xvdXIuc3Vic3RyaW5nKDIsNCksIGVuZENvbG91ci5zdWJzdHJpbmcoMiw0KSkgXG5cdFx0XHQrIGNhbGNIZXgobnVtYmVyLCBzdGFydENvbG91ci5zdWJzdHJpbmcoNCw2KSwgZW5kQ29sb3VyLnN1YnN0cmluZyg0LDYpKTtcblx0fVxuXHRcblx0ZnVuY3Rpb24gY2FsY0hleChudW1iZXIsIGNoYW5uZWxTdGFydF9CYXNlMTYsIGNoYW5uZWxFbmRfQmFzZTE2KVxuXHR7XG5cdFx0dmFyIG51bSA9IG51bWJlcjtcblx0XHRpZiAobnVtIDwgbWluTnVtKSB7XG5cdFx0XHRudW0gPSBtaW5OdW07XG5cdFx0fVxuXHRcdGlmIChudW0gPiBtYXhOdW0pIHtcblx0XHRcdG51bSA9IG1heE51bTtcblx0XHR9IFxuXHRcdHZhciBudW1SYW5nZSA9IG1heE51bSAtIG1pbk51bTtcblx0XHR2YXIgY1N0YXJ0X0Jhc2UxMCA9IHBhcnNlSW50KGNoYW5uZWxTdGFydF9CYXNlMTYsIDE2KTtcblx0XHR2YXIgY0VuZF9CYXNlMTAgPSBwYXJzZUludChjaGFubmVsRW5kX0Jhc2UxNiwgMTYpOyBcblx0XHR2YXIgY1BlclVuaXQgPSAoY0VuZF9CYXNlMTAgLSBjU3RhcnRfQmFzZTEwKS9udW1SYW5nZTtcblx0XHR2YXIgY19CYXNlMTAgPSBNYXRoLnJvdW5kKGNQZXJVbml0ICogKG51bSAtIG1pbk51bSkgKyBjU3RhcnRfQmFzZTEwKTtcblx0XHRyZXR1cm4gZm9ybWF0SGV4KGNfQmFzZTEwLnRvU3RyaW5nKDE2KSk7XG5cdH1cblxuXHRmdW5jdGlvbiBmb3JtYXRIZXgoaGV4KSBcblx0e1xuXHRcdGlmIChoZXgubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRyZXR1cm4gJzAnICsgaGV4O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gaGV4O1xuXHRcdH1cblx0fSBcblx0XG5cdGZ1bmN0aW9uIGlzSGV4Q29sb3VyKHN0cmluZylcblx0e1xuXHRcdHZhciByZWdleCA9IC9eIz9bMC05YS1mQS1GXXs2fSQvaTtcblx0XHRyZXR1cm4gcmVnZXgudGVzdChzdHJpbmcpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0SGV4Q29sb3VyKHN0cmluZylcblx0e1xuXHRcdGlmIChpc0hleENvbG91cihzdHJpbmcpKSB7XG5cdFx0XHRyZXR1cm4gc3RyaW5nLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoIC0gNiwgc3RyaW5nLmxlbmd0aCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBuYW1lID0gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAoY29sb3VyTmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIGNvbG91ck5hbWVzW25hbWVdO1xuXHRcdFx0fVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKHN0cmluZyArICcgaXMgbm90IGEgdmFsaWQgY29sb3VyLicpO1xuXHRcdH1cblx0fVxuXHRcblx0Ly8gRXh0ZW5kZWQgbGlzdCBvZiBDU1MgY29sb3JuYW1lcyBzIHRha2VuIGZyb21cblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8jc3ZnLWNvbG9yXG5cdHZhciBjb2xvdXJOYW1lcyA9IHtcblx0XHRhbGljZWJsdWU6IFwiRjBGOEZGXCIsXG5cdFx0YW50aXF1ZXdoaXRlOiBcIkZBRUJEN1wiLFxuXHRcdGFxdWE6IFwiMDBGRkZGXCIsXG5cdFx0YXF1YW1hcmluZTogXCI3RkZGRDRcIixcblx0XHRhenVyZTogXCJGMEZGRkZcIixcblx0XHRiZWlnZTogXCJGNUY1RENcIixcblx0XHRiaXNxdWU6IFwiRkZFNEM0XCIsXG5cdFx0YmxhY2s6IFwiMDAwMDAwXCIsXG5cdFx0YmxhbmNoZWRhbG1vbmQ6IFwiRkZFQkNEXCIsXG5cdFx0Ymx1ZTogXCIwMDAwRkZcIixcblx0XHRibHVldmlvbGV0OiBcIjhBMkJFMlwiLFxuXHRcdGJyb3duOiBcIkE1MkEyQVwiLFxuXHRcdGJ1cmx5d29vZDogXCJERUI4ODdcIixcblx0XHRjYWRldGJsdWU6IFwiNUY5RUEwXCIsXG5cdFx0Y2hhcnRyZXVzZTogXCI3RkZGMDBcIixcblx0XHRjaG9jb2xhdGU6IFwiRDI2OTFFXCIsXG5cdFx0Y29yYWw6IFwiRkY3RjUwXCIsXG5cdFx0Y29ybmZsb3dlcmJsdWU6IFwiNjQ5NUVEXCIsXG5cdFx0Y29ybnNpbGs6IFwiRkZGOERDXCIsXG5cdFx0Y3JpbXNvbjogXCJEQzE0M0NcIixcblx0XHRjeWFuOiBcIjAwRkZGRlwiLFxuXHRcdGRhcmtibHVlOiBcIjAwMDA4QlwiLFxuXHRcdGRhcmtjeWFuOiBcIjAwOEI4QlwiLFxuXHRcdGRhcmtnb2xkZW5yb2Q6IFwiQjg4NjBCXCIsXG5cdFx0ZGFya2dyYXk6IFwiQTlBOUE5XCIsXG5cdFx0ZGFya2dyZWVuOiBcIjAwNjQwMFwiLFxuXHRcdGRhcmtncmV5OiBcIkE5QTlBOVwiLFxuXHRcdGRhcmtraGFraTogXCJCREI3NkJcIixcblx0XHRkYXJrbWFnZW50YTogXCI4QjAwOEJcIixcblx0XHRkYXJrb2xpdmVncmVlbjogXCI1NTZCMkZcIixcblx0XHRkYXJrb3JhbmdlOiBcIkZGOEMwMFwiLFxuXHRcdGRhcmtvcmNoaWQ6IFwiOTkzMkNDXCIsXG5cdFx0ZGFya3JlZDogXCI4QjAwMDBcIixcblx0XHRkYXJrc2FsbW9uOiBcIkU5OTY3QVwiLFxuXHRcdGRhcmtzZWFncmVlbjogXCI4RkJDOEZcIixcblx0XHRkYXJrc2xhdGVibHVlOiBcIjQ4M0Q4QlwiLFxuXHRcdGRhcmtzbGF0ZWdyYXk6IFwiMkY0RjRGXCIsXG5cdFx0ZGFya3NsYXRlZ3JleTogXCIyRjRGNEZcIixcblx0XHRkYXJrdHVycXVvaXNlOiBcIjAwQ0VEMVwiLFxuXHRcdGRhcmt2aW9sZXQ6IFwiOTQwMEQzXCIsXG5cdFx0ZGVlcHBpbms6IFwiRkYxNDkzXCIsXG5cdFx0ZGVlcHNreWJsdWU6IFwiMDBCRkZGXCIsXG5cdFx0ZGltZ3JheTogXCI2OTY5NjlcIixcblx0XHRkaW1ncmV5OiBcIjY5Njk2OVwiLFxuXHRcdGRvZGdlcmJsdWU6IFwiMUU5MEZGXCIsXG5cdFx0ZmlyZWJyaWNrOiBcIkIyMjIyMlwiLFxuXHRcdGZsb3JhbHdoaXRlOiBcIkZGRkFGMFwiLFxuXHRcdGZvcmVzdGdyZWVuOiBcIjIyOEIyMlwiLFxuXHRcdGZ1Y2hzaWE6IFwiRkYwMEZGXCIsXG5cdFx0Z2FpbnNib3JvOiBcIkRDRENEQ1wiLFxuXHRcdGdob3N0d2hpdGU6IFwiRjhGOEZGXCIsXG5cdFx0Z29sZDogXCJGRkQ3MDBcIixcblx0XHRnb2xkZW5yb2Q6IFwiREFBNTIwXCIsXG5cdFx0Z3JheTogXCI4MDgwODBcIixcblx0XHRncmVlbjogXCIwMDgwMDBcIixcblx0XHRncmVlbnllbGxvdzogXCJBREZGMkZcIixcblx0XHRncmV5OiBcIjgwODA4MFwiLFxuXHRcdGhvbmV5ZGV3OiBcIkYwRkZGMFwiLFxuXHRcdGhvdHBpbms6IFwiRkY2OUI0XCIsXG5cdFx0aW5kaWFucmVkOiBcIkNENUM1Q1wiLFxuXHRcdGluZGlnbzogXCI0QjAwODJcIixcblx0XHRpdm9yeTogXCJGRkZGRjBcIixcblx0XHRraGFraTogXCJGMEU2OENcIixcblx0XHRsYXZlbmRlcjogXCJFNkU2RkFcIixcblx0XHRsYXZlbmRlcmJsdXNoOiBcIkZGRjBGNVwiLFxuXHRcdGxhd25ncmVlbjogXCI3Q0ZDMDBcIixcblx0XHRsZW1vbmNoaWZmb246IFwiRkZGQUNEXCIsXG5cdFx0bGlnaHRibHVlOiBcIkFERDhFNlwiLFxuXHRcdGxpZ2h0Y29yYWw6IFwiRjA4MDgwXCIsXG5cdFx0bGlnaHRjeWFuOiBcIkUwRkZGRlwiLFxuXHRcdGxpZ2h0Z29sZGVucm9keWVsbG93OiBcIkZBRkFEMlwiLFxuXHRcdGxpZ2h0Z3JheTogXCJEM0QzRDNcIixcblx0XHRsaWdodGdyZWVuOiBcIjkwRUU5MFwiLFxuXHRcdGxpZ2h0Z3JleTogXCJEM0QzRDNcIixcblx0XHRsaWdodHBpbms6IFwiRkZCNkMxXCIsXG5cdFx0bGlnaHRzYWxtb246IFwiRkZBMDdBXCIsXG5cdFx0bGlnaHRzZWFncmVlbjogXCIyMEIyQUFcIixcblx0XHRsaWdodHNreWJsdWU6IFwiODdDRUZBXCIsXG5cdFx0bGlnaHRzbGF0ZWdyYXk6IFwiNzc4ODk5XCIsXG5cdFx0bGlnaHRzbGF0ZWdyZXk6IFwiNzc4ODk5XCIsXG5cdFx0bGlnaHRzdGVlbGJsdWU6IFwiQjBDNERFXCIsXG5cdFx0bGlnaHR5ZWxsb3c6IFwiRkZGRkUwXCIsXG5cdFx0bGltZTogXCIwMEZGMDBcIixcblx0XHRsaW1lZ3JlZW46IFwiMzJDRDMyXCIsXG5cdFx0bGluZW46IFwiRkFGMEU2XCIsXG5cdFx0bWFnZW50YTogXCJGRjAwRkZcIixcblx0XHRtYXJvb246IFwiODAwMDAwXCIsXG5cdFx0bWVkaXVtYXF1YW1hcmluZTogXCI2NkNEQUFcIixcblx0XHRtZWRpdW1ibHVlOiBcIjAwMDBDRFwiLFxuXHRcdG1lZGl1bW9yY2hpZDogXCJCQTU1RDNcIixcblx0XHRtZWRpdW1wdXJwbGU6IFwiOTM3MERCXCIsXG5cdFx0bWVkaXVtc2VhZ3JlZW46IFwiM0NCMzcxXCIsXG5cdFx0bWVkaXVtc2xhdGVibHVlOiBcIjdCNjhFRVwiLFxuXHRcdG1lZGl1bXNwcmluZ2dyZWVuOiBcIjAwRkE5QVwiLFxuXHRcdG1lZGl1bXR1cnF1b2lzZTogXCI0OEQxQ0NcIixcblx0XHRtZWRpdW12aW9sZXRyZWQ6IFwiQzcxNTg1XCIsXG5cdFx0bWlkbmlnaHRibHVlOiBcIjE5MTk3MFwiLFxuXHRcdG1pbnRjcmVhbTogXCJGNUZGRkFcIixcblx0XHRtaXN0eXJvc2U6IFwiRkZFNEUxXCIsXG5cdFx0bW9jY2FzaW46IFwiRkZFNEI1XCIsXG5cdFx0bmF2YWpvd2hpdGU6IFwiRkZERUFEXCIsXG5cdFx0bmF2eTogXCIwMDAwODBcIixcblx0XHRvbGRsYWNlOiBcIkZERjVFNlwiLFxuXHRcdG9saXZlOiBcIjgwODAwMFwiLFxuXHRcdG9saXZlZHJhYjogXCI2QjhFMjNcIixcblx0XHRvcmFuZ2U6IFwiRkZBNTAwXCIsXG5cdFx0b3JhbmdlcmVkOiBcIkZGNDUwMFwiLFxuXHRcdG9yY2hpZDogXCJEQTcwRDZcIixcblx0XHRwYWxlZ29sZGVucm9kOiBcIkVFRThBQVwiLFxuXHRcdHBhbGVncmVlbjogXCI5OEZCOThcIixcblx0XHRwYWxldHVycXVvaXNlOiBcIkFGRUVFRVwiLFxuXHRcdHBhbGV2aW9sZXRyZWQ6IFwiREI3MDkzXCIsXG5cdFx0cGFwYXlhd2hpcDogXCJGRkVGRDVcIixcblx0XHRwZWFjaHB1ZmY6IFwiRkZEQUI5XCIsXG5cdFx0cGVydTogXCJDRDg1M0ZcIixcblx0XHRwaW5rOiBcIkZGQzBDQlwiLFxuXHRcdHBsdW06IFwiRERBMEREXCIsXG5cdFx0cG93ZGVyYmx1ZTogXCJCMEUwRTZcIixcblx0XHRwdXJwbGU6IFwiODAwMDgwXCIsXG5cdFx0cmVkOiBcIkZGMDAwMFwiLFxuXHRcdHJvc3licm93bjogXCJCQzhGOEZcIixcblx0XHRyb3lhbGJsdWU6IFwiNDE2OUUxXCIsXG5cdFx0c2FkZGxlYnJvd246IFwiOEI0NTEzXCIsXG5cdFx0c2FsbW9uOiBcIkZBODA3MlwiLFxuXHRcdHNhbmR5YnJvd246IFwiRjRBNDYwXCIsXG5cdFx0c2VhZ3JlZW46IFwiMkU4QjU3XCIsXG5cdFx0c2Vhc2hlbGw6IFwiRkZGNUVFXCIsXG5cdFx0c2llbm5hOiBcIkEwNTIyRFwiLFxuXHRcdHNpbHZlcjogXCJDMEMwQzBcIixcblx0XHRza3libHVlOiBcIjg3Q0VFQlwiLFxuXHRcdHNsYXRlYmx1ZTogXCI2QTVBQ0RcIixcblx0XHRzbGF0ZWdyYXk6IFwiNzA4MDkwXCIsXG5cdFx0c2xhdGVncmV5OiBcIjcwODA5MFwiLFxuXHRcdHNub3c6IFwiRkZGQUZBXCIsXG5cdFx0c3ByaW5nZ3JlZW46IFwiMDBGRjdGXCIsXG5cdFx0c3RlZWxibHVlOiBcIjQ2ODJCNFwiLFxuXHRcdHRhbjogXCJEMkI0OENcIixcblx0XHR0ZWFsOiBcIjAwODA4MFwiLFxuXHRcdHRoaXN0bGU6IFwiRDhCRkQ4XCIsXG5cdFx0dG9tYXRvOiBcIkZGNjM0N1wiLFxuXHRcdHR1cnF1b2lzZTogXCI0MEUwRDBcIixcblx0XHR2aW9sZXQ6IFwiRUU4MkVFXCIsXG5cdFx0d2hlYXQ6IFwiRjVERUIzXCIsXG5cdFx0d2hpdGU6IFwiRkZGRkZGXCIsXG5cdFx0d2hpdGVzbW9rZTogXCJGNUY1RjVcIixcblx0XHR5ZWxsb3c6IFwiRkZGRjAwXCIsXG5cdFx0eWVsbG93Z3JlZW46IFwiOUFDRDMyXCJcblx0fVxufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBSYWluYm93O1xufVxuIl19
