# jsoop
Java Script OOP

## class creation
```JavaScript
var Animal = Object.extend({
	weight: 0,
	abilities: ['eat','breath','see'],
	constructor: function(name){
		this.name = name;
	},
	say: function(){
		console.log("I'am " + this.name)
	}
})

var dogg = new Animal('Snoop');
var cat  = new Animal('Tom');

dogg.say() //I'am Snoop
cat.say() //I'am Tom
```

##inheritance
```JavaScript
var Monkey = Animal.extend({
	constructor: function(name){
		Monkey.superclass.constructor.call(this,name)
	},
	jump: function(){
		console.log('Jumping')
	}
})

var monkey = new Monkey('Joe')

monkey.say() //I'am Joe
monkey.jump() //Jumping
```

##public
```JavaScript
Animal.prototype.someVal = 0;
Animal.prototype.someAction = function(){
	/*...*/
}
```

##private
```JavaScript
Animal.prototype.__someVal__ = 0;
Animal.prototype.__someAction__ = function(){
	/*...*/
}
```
or
```JavaScript
var Animal = Object.extend(function(){
	var foo = 'bar';

	return {
		getPrivate: function(){
			return foo;
		}
	}
}())
```

##static 
```JavaScript
Animal.someVal = 0;
Animal.someAction = function(){
	/*...*/
}
```

##instanceof
```JavaScript
var Animal = Object.extend({/*...*/})

var Monkey = Animal.extend({/*...*/})
var Human  = Monkey.extend({/*...*/}) 

var Wolf = Animal.extend({/*...*/})
var Dog  = Wolf.extend({/*...*/})

console.log(new Dog() instanceof Wolf) //true
console.log(new Dog() instanceof Animal) //true
console.log(new Dog() instanceof Monkey) //false
```

##singletone
```JavaScript
Animal.__instance__ = null;
Animal.getInstance = function(){
	if(this.__instance__ === null)
		this.__instance__ = new Animal();

	return this.__instance__;
}
```

##reference
```JavaScript
var IntegerArray = Array.extend({
	myarray: [5,8,1,3,2],
	getArray: function(){
		return this.myarray;
	}
})

var ia = new IntegerArray();
var sorted = ia.getArray().sort();

console.log(sorted,ia.getArray())
//([1, 2, 3, 5, 8],[1, 2, 3, 5, 8])
```

using clone
```JavaScript
var IntegerArray = Array.extend({
	myarray: [5,8,1,3,2],
	getArray: function(){
		return this.myarray.clone();
	}
})

var ia = new IntegerArray();
var sorted = ia.getArray().sort();

console.log(sorted,ia.getArray())
// ([1, 2, 3, 5, 8],[5, 8, 1, 3, 2])
```
for object use Object.create

##namespace
```JavaScript
Object.namespace('milkyway.solar.earth')
// window.milkyway.solar.earth

var scope = {}
Object.namespace('milkyway.solar.earth',scope)
// scope.milkyway.solar.earth

Object.namespace('milkyway.solar.earth.life').Animal = Object.extend({
	/*...*/
})

var animal = new milkyway.solar.earth.life.Animal();
```

##isset
```JavaScript
Object.isset('window.Array.prototype.sort') //true

Object.isset('sort',Array.prototype) // true
```
