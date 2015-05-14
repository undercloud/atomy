# jsoop
Java Script OOP

```JavaScript
(function(scope){
	"use strict";

	if(typeof Object.namespace != 'function'){
		Object.namespace = function(ns,g){
			var chain = ns.split('.'),
				root = g || scope;

			for(var i=0,l=chain.length;i<l;i++){
				if(typeof root[chain[i]] === "undefined"){
					root[chain[i]] = {};
				}

				root = root[chain[i]];
			}

			return root;
		};
	}

	if(typeof Object.create != 'function'){
		Object.create = (function(){
			var tmp = function(){};

			return function(prototype){
				if(arguments.length > 1){
					throw Error('Second argument not supported');
				}

				if(typeof prototype != 'object'){
					throw TypeError('Argument must be an object');
				}

				tmp.prototype = prototype;
				var result = new tmp();
				tmp.prototype = null;

				return result;
			};
		})();
	}

	if(typeof Array.prototype.clone != 'function'){
		Array.prototype.clone = function(){
			return this.slice(0);
		}
	}

	function mixin(dst){
		for(var i=1,l=arguments.length;i<l; i++){
			for(var prop in arguments[i]){
				if(arguments[i].hasOwnProperty(prop)){
					dst[prop] = arguments[i][prop];
				}
			}
		}

		return dst;
	}

	Function.prototype.extend = function(proto){
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
})(this)

	var Animal = Object.extend({
		brainWeight: 0,
		statics: {
			
		}
		constructor: function(name){
			this.name = name;
		},
		say: function(){
			return 'Zzz...';
		}
	})

	var Monkey = Animal.extend({
		brainWeight: 400,
		constructor: function(name){
			Monkey.superclass.constructor.call(this,name)
		},
		jump: function(){
			return 'Jump, jump!';
		}
	})

	var Human = Monkey.extend({
		brainWeight: 1200,
		constructor: function(name){
			Monkey.superclass.constructor.call(this,name)
		},
		say: function(){
			return "I'am " + this.name;
		},
		programming: function(){
			return 'JavaScript!';
		}
	})

	var bob = new Human('Bob');
	console.log(
		bob.say(),
		bob.jump(),
		bob.programming(),
		bob instanceof Animal
	)

	//singletone
	/*Animal.__instance__ = null;
	Animal.getInstance = function(){
		if(this.__instance__ === null)
			this.__instance__ = new Animal();

		return this.__instance__;
	}*/
```
