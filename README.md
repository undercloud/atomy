#Atomy
JavaScript OOP

##installaton
`npm install atomy`

Browser
```html
<script src="/path/to/undercloud.atomy.min.js"></script>
```

NodeJS
```js
var Atomy = require('atomy');
```

##class creation
```js
var Animal = Atomy.extend({
  weight: 0,
  abilities: ['eat','breath','see'],
  constructor: function(name) {
    this.name = name;
  },
  say: function() {
    console.log("I'am " + this.name);
  }
})

var dogg = new Animal('Snoop');
var cat  = new Animal('Tom');

dogg.say(); //I'am Snoop
cat.say(); //I'am Tom
```

##inheritance
```js
var Monkey = Animal.extend({
  constructor: function(name) {
    Monkey.superclass.constructor.call(this, name);
  },
  jump: function() {
    console.log('I can jump');
  }
})

var monkey = new Monkey('Joe');

monkey.say(); //I'am Joe
monkey.jump(); //I can jump
```

##extends an existing class
```js
var ReversedArray = Atomy.extend(Array, {
  constructor: function() {
    for (var i in arguments){
      this.push(arguments[i]);
    }
  },
  reverseSort: function() {
    return this.sort().reverse();
  }
})

var ra = new ReversedArray(1,5,3,4,2);
ra.reverseSort(); //[5,4,3,2,1]
```

##instanceof
```js
var Animal = Atomy.extend({/*...*/});

var Monkey = Animal.extend({/*...*/});
var Human  = Monkey.extend({/*...*/});

var Wolf = Animal.extend({/*...*/});
var Dog  = Wolf.extend({/*...*/});

console.log(new Dog() instanceof Wolf); //true
console.log(new Dog() instanceof Animal); //true
console.log(new Dog() instanceof Monkey); //false
```

##constant
```js
var XMath = Atomy.extend({});

XMath.constant('PI', 3.14);

try {
  XMath.PI = 0;
} catch (e) {

}

XMath.PI; //3.14
```
Add constant into existing objects
```js
Atomy.constant(window, 'MYCONST', true);
window.MYCONST = false;
window.MYCONST; //true
```

##private
```js
var Something = Atomy.extend({
  constructor: function() {
    var hiddenProperty = 'Hidden Value';

    Something.prototype.getHiddenProperty = function() {
      return hiddenProperty;
    };
  }
});

var s = new Something();
s.getHiddenProperty(); //Hidden Value
```

##inject
Extend object prototype
```js
var Something = Atomy.extend({/*...*/});

Something.inject({
  foo: 'Bar',
  getFoo: function() {
    return this.foo;
  }
});

var some = new Something();
some.getFoo(); //Bar
```
Inject single property
```js
Something.inject('square', function(x) {
  return x * x;
});

some.square(3); //9
```
Inject into existing objects
```js
Atomy.inject(Array, 'reverseSort', function() {
  return this.sort().reverse()
});

var a = [6,7,3,4,2];
a.reverseSort(); //[7, 6, 4, 3, 2]
```

##share
Same as `Atomy.inject` but extends only static context
```js
var Something = Atomy.extend({/*...*/});

Something.share({
  foo: 'Bar',
  getFoo: function() {
    return this.foo;
  }
});

Something.getFoo(); //Bar
```
Share single property
```js
Something.inject('square', function(x) {
  return x * x;
});

Something.square(3); //9
```
Share existing objects
```js
Atomy.share(window.location, 'setHash', function(hash) {
  this.hash = hash;
});

window.location.setHash('goto');
```

##singletone
```js
var Animal = Atomy.extend({});

Animal.__instance__ = null;
Animal.getInstance = function() {
  if(this.__instance__ === null) {
    this.__instance__ = new Animal();
  }

  return this.__instance__;
}

var a = Animal.getInstance();
var b = Animal.getInstance();

a === b //true
```

##namespace
```js
Atomy.namespace('milkyway.solar.earth');
//window.milkyway.solar.earth

var scope = {};
Atomy.namespace('milkyway.solar.earth',scope);
//scope.milkyway.solar.earth

Atomy.namespace('milkyway.solar.earth.life').Animal = Atomy.extend({
  /*...*/
});

var animal = new milkyway.solar.earth.life.Animal();
```

##isset
```js
Atomy.isset('window.Array.prototype.sort'); //true
Atomy.isset('sort', Array.prototype); //true

var Animal = Atomy.extend({
  say: function() {
    /*...*/
  }
});

var monkey = new Animal();
monkey.isset('say') //true

Animal.abilities = []; 
Animal.isset('abilities'); //true
```

##toString
```js
var Animal = Atomy.extend({
  toString: function() {
    return '[object Atomy]';
  }
});
```
