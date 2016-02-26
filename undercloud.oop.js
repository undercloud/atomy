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
		
		return this;
	}

	Atomy.inject = function(object, prototype) {
		if (typeof object.prototype == "undefined") {
			object.prototype = {}
		}

		for (var key in prototype) {
			object.prototype[key] = prototype[key];
		}

		return this;
	}

	Atomy.statics = function(object, statics) {
		for (var key in statics) {
			object[key] = statics[key];
		}

		return this;
	}

	Atomy.isset = function(ns, root){
		var chain = ns.split('.'),
			root = root || this;

		for (var i = 0, l = chain.length; i < l; i++) {
			if (typeof root[chain[i]] === "undefined") {
				return false;
			}

			root = root[chain[i]];
		}

		return true;
	};

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

	Atomy.extend = function() {
		var that,
			proto;

		switch (arguments.length) {
			default:
				that = this;
				proto = {};
			break;

			case 1:
				that = this;
				proto = arguments[0];
			break;

			case 2:
				that = arguments[0];
				proto = arguments[1];
			break;
		}

		var constructor = proto.hasOwnProperty('constructor') 
			? proto.constructor 
			: function() {};

		var F = function(){};
		F.prototype = that.prototype;
		constructor.prototype = mixin(new F(), proto);
		constructor.superclass = that.prototype;
		constructor.prototype.constructor = constructor;
		
		constructor.extend = Atomy.extend;
		constructor.constant = function(name, value) {
			return Atomy.constant(this, name, value);
		};
		constructor.statics = function(statics) {
			return Atomy.statics(this, statics);
		};
		constructor.inject = function(prototype) {
			return Atomy.inject(this, prototype);
		}

		return constructor;
	}

	if (Atomy.isset('module.exports', scope)) {
		scope.module.exports = Atomy;
	} else if(Atomy.isset('define.amd', scope)) {
		define([], function() {
			return Atomy;
		});
	} else {
		scope.Atomy = Atomy;
	}
})(this)
