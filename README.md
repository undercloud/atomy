# jsoop
Java Script OOP

```JavaScript
(function(w){
	"use strict";

	if(!Object.namespace){
		Object.namespace = function(ns){
			var chain = ns.split('.'),
				root = w;

			for(var i=0,l=chain.length;i<l;i++){
				if(typeof root[chain[i]] === "undefined"){
					root[chain[i]] = {};
				}

				root = root[chain[i]];
			}

			return root;
		};
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
})(window)
```
