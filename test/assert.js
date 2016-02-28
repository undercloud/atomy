"use strict";

//node /var/www/node_modules/.bin/mocha assert.js

var assert = require('assert'),
	Atomy = require('../atomy.js');

describe('Atomy', function() {
	describe('#extend', function() {
		it('should return extended object', function() {

			var Animal = Atomy.extend({
				weight: 10,
				constructor: function(name) {
					this.name = name;
				},
				getName: function() {
					return this.name;
				},
				getWeight: function() {
					return this.weight;
				}
			});

			var Monkey = new Animal('Joe');

			assert.equal(Monkey.getName(), 'Joe');
			assert.equal(Monkey.getWeight(), 10);
		});
	});

	describe('#inherit', function() {
		it('check simple inherit', function() {
			var Animal = Atomy.extend({
				abilities: ['Run'],
				name: null,
				constructor: function(name) {
					this.name = name;
				}
			});

			var Wolf = Animal.extend({
				constructor: function(name) {
					Wolf.superclass.constructor.call(this, name);

					this.abilities.push('Growl');
				},
				getName: function() {
					return this.name;
				}
			});

			var Dog = Wolf.extend({
				constructor: function(name) {
					Dog.superclass.constructor.call(this, name);

					this.abilities.push('Be Funny');
				},
				getAbilities: function() {
					return this.abilities;
				}
			});

			var snoop = new Dog('Snoopy');

			assert.equal('Snoopy', snoop.getName());
			assert.equal(['Run', 'Growl', 'Be Funny'].toString(), snoop.getAbilities().toString()); 
		});
	});

	describe('#inheritPrototype', function() {
		it('check inherit prototype', function() {			
			var CustomArray = Atomy.extend(Array, {
				constructor: function() {
					for (var i in arguments) {
						this.push(arguments[i]);
					}
				},
				reverseSort: function() {
					return this.sort().reverse();
				}
			});

			var ca = new CustomArray(1,5,4,2,3);

			assert.equal([5,4,3,2,1].toString(), ca.reverseSort().toString());
		});
	});

	describe('#instanceOf', function() {
		it('check object instance', function() {
			var Animal = Atomy.extend({});

			var Wolf = Animal.extend({});
			var Dog = Wolf.extend({});

			var Monkey = Animal.extend({});
			var Human = Monkey.extend({});

			assert.equal(true, new Dog() instanceof Wolf);
			assert.equal(true, new Dog() instanceof Animal);
			assert.equal(false, new Dog() instanceof Human);
		});
	});

	describe('#constant', function() {
		it('define constant', function() {
			var XMath = Atomy.extend({});

			XMath.constant('PI', 3.14);
			
			try {
				XMath.PI = 0;
			} catch (e) {

			}

			assert.equal(3.14, XMath.PI);
		});
	});

	describe('#share', function() {
		it('extends object', function() {
			var Something = Atomy.extend({
				something: 'Atomy',
				getSomething: function() {
					return this.something;
				}
			});

			Something.share({
				foo: 'Bar',
				getFoo: function() {
					return this.foo;
				}
			});

			var some = new Something();

			assert.equal('Atomy', some.getSomething());
			assert.equal('Bar', Something.getFoo());
		});
	});

	describe('#inject', function() {
		it('extends prototype', function() {
			var Something = Atomy.extend({
				something: 'Atomy',
				getSomething: function() {
					return this.something;
				}
			});

			Something.inject({
				foo: 'Bar',
				getFoo: function() {
					return this.foo;
				}
			});

			var some = new Something();

			assert.equal('Atomy', some.getSomething());
			assert.equal('Bar', some.getFoo());
		});
	});

	describe('#isset', function() {
		it('check chain isset', function() {
			var Chain = Atomy.extend({
				a: {
					b: {
						c: 'JS'
					}
				}
			});

			Chain.b = {
				c: {
					d: 'Node'
				}
			};

			var chain = new Chain();

			assert.equal(true, Atomy.isset('a.b.c', chain));
			assert.equal(true, Chain.isset('b.c.d'));
			assert.equal(true, chain.isset('a.b.c'));
		});
	});

	describe('#namespace', function() {
		it('generate namespace', function() {
			var Hex = {};

			Atomy.namespace('a.b.c.d.e.f', Hex).dec2hex = function(hex) {
				return parseInt(hex, 16);
			};

			assert.equal(Atomy.isset('a.b.c.d.e.f.dec2hex', Hex), true);
			assert.equal(Hex.a.b.c.d.e.f.dec2hex(123), 291);
		});
	});

	describe('#toString', function() {
		it('should return string value of object', function() {
			var Animal = Atomy.extend({
				toString: function() {
					return '[object Atomy]';
				}
			});

			assert.equal('' + new Animal(), '[object Atomy]');
		});
	});
});
