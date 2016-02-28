;(function(scope){
	'use strict';

	var mixin = function (dst) {
		for (var i = 1, l = arguments.length; i < l; i++) {
			for (var prop in arguments[i]) {
				if (arguments[i].hasOwnProperty(prop)) {
					dst[prop] = arguments[i][prop];
				}
			}
		}

		return dst;
	};

	var args = function (list) {
		var object,
			share;

		switch (list.length) {
			case 2:
				object = list[0];
				share = list[1];
			break;

			case 3:
				var key = list[1];
				var val = list[2];

				object = list[0];
				share = {
					key:  val 
				};
			break;

			default:
				throw new Error('Invalid arguments length');
			break;
		}

		return {
			object: object,
			share: share
		};
	};

	var Atomy = {};

	Atomy.namespace = function(ns, g) {
		var chain = ns.split('.'),
			root = g || scope;

		for(var i = 0, l = chain.length; i < l; i++) {
			if(typeof root[chain[i]] === 'undefined') {
				root[chain[i]] = {};
			}

			root = root[chain[i]];
		}

		return root;
	};

	Atomy.constant = function(object, constant, value) {
		Object.defineProperty (object, constant, { value : value, writable: false });
		
		return this;
	};

	Atomy.inject = function() {
		var a = args(arguments);

		if (false ===  a.object.hasOwnProperty('prototype')) {
			a.object.prototype = {};
		}

		for (var key in a.share) {
			if (a.share.hasOwnProperty(key)) {
				a.object.prototype[key] = a.share[key];
			}
		}

		return this;
	};

	Atomy.share = function() {
		var a = args(arguments);

		for (var key in a.share) {	
			if (a.share.hasOwnProperty(key)) {
				a.object[key] = a.share[key];
			}
		}

		return this;
	};

	Atomy.isset = function(ns, g) {
		var chain = ns.split('.'),
			root = g || scope;

		for (var i = 0, l = chain.length; i < l; i++) {
			if (typeof root[chain[i]] === 'undefined') {
				return false;
			}

			root = root[chain[i]];
		}

		return true;
	};


	Atomy.extend = function() {
		var that,
			proto;

		switch (arguments.length) {
			case 1:
				that = this;
				proto = arguments[0];
			break;

			case 2:
				that = arguments[0];
				proto = arguments[1];
			break;

			default:
				that = this;
				proto = {};
			break;
		}

		var constructor = proto.hasOwnProperty('constructor') ? proto.constructor : function() {};

		var F = function(){};
		F.prototype = that.prototype;
		constructor.prototype = mixin(new F(), proto);
		constructor.superclass = that.prototype;
		constructor.prototype.constructor = constructor;
		
		constructor.extend = Atomy.extend;
		constructor.constant = function(name, value) {
			return Atomy.constant(this, name, value);
		};
		constructor.share = function() {
			return Atomy.share.apply(null, [this].concat([].slice.call(arguments)));
		};
		constructor.inject = function(prototype) {
			return Atomy.inject.apply(null, [this].concat([].slice.call(arguments)));
		};
		constructor.isset = function(path) {
			return Atomy.isset(path, this);
		};
		constructor.prototype.isset = constructor.isset;

		return constructor;
	};

	if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
		module.exports = Atomy;
	} else if(typeof define != 'undefined' && typeof define.amd != 'undefined') {
		define([], function() {
			return Atomy;
		});
	} else {
		scope.Atomy = Atomy;
	}
}(this));
