(function(scope){
	"use strict";

	var Atomy = {};

	Atomy.namespace = function(ns, g){
		var chain = ns.split('.'),
			root = g || scope;

		for(var i = 0, l = chain.length; i < l; i++){
			if(typeof root[chain[i]] === "undefined"){
				root[chain[i]] = {};
			}

			root = root[chain[i]];
		}

		return root;
	};

	Atomy.constant = function(object, constant, value) {
		Object.defineProperty (object, constant,{ value : value, writable: false });
	}

	Atomy.inject = function(object, prototype) {
		if (typeof object.prototype == "undefined") {
			object.prototype = {}
		}

		for (var key in prototype) {
			object.prototype[key] = prototype[key];
		}
	}

	Atomy.static = function(object, statics) {
		for (var key in statics) {
			object[key] = statics[key];
		}
	}

	if (typeof Object.prototype.isset != 'function') {
		Object.prototype.isset = function(ns){
			var chain = ns.split('.'),
				root = this;

			for (var i = 0, l = chain.length; i < l; i++) {
				if (typeof root[chain[i]] === "undefined") {
					return false;
				}

				root = root[chain[i]];
			}

			return true;
		};
	}

	function mixin(dst){
		for (var i = 1, l = arguments.length; i < l; i++) {
			for (var prop in arguments[i]) {
				if (arguments[i].hasOwnProperty(prop)) {
					dst[prop] = arguments[i][prop];
				}
			}
		}

		return dst;
	}

	Function.prototype.extend = function(proto) {
		var that = this;
		proto = proto || {};
		var constructor = proto.hasOwnProperty('constructor') 
			? proto.constructor 
			: function() { that.apply(this, arguments); };

		var F = function(){};
		F.prototype = this.prototype;
		constructor.prototype = mixin(new F(), proto);
		constructor.superclass = this.prototype;
		constructor.prototype.constructor = constructor;
		
		return constructor;
	}

	if (scope.isset('module.exports')) {
		scope.module.exports = Atomy;
	} else if(scope.isset('define.amd')) {
		define([], function() {
			return Atomy;
		});
	} else {
		scope.Atomy = Atomy;
	}
})(this)
