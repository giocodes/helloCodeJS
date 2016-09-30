var mod = require('./testFile2')

function function1(){

	a();

	a = b();

	return function(){
		c();
	}

}

var function2 = function(){

}

var obj = {};

obj.function3 = function(){

}

a = function(){

	a()

	return function(){

	}
}

a(function(){})

obj.function3()

a()

a = a();


