var mod2 = require('./testFile2.js')	// 1 // global

var banana = function(){			// 2 // global
	
	var apple = function(){			// 3 // global=>banana

	}

	apple();						// 4 // global=>banana
}

function apple(){					// 5 // global

} 

var obj = {
	fruit: function(){}				// 6 // global
};

obj.cake = function(){				// 7 // global

	apple();						// 8 // global=>cake
	banana();						// 9 // global=>cake
	return function(){				// 10 // global=>cake

		apple();					// 11 // global=>cake=>anonymous

	}

}

duck = function(){					// 12 // global

	obj.cake()						// 13 // global=>duck

	return function(){				// 14 // global=>duck

	}
}

apple(blah=>'hello', function(){})	// 15, 16, 17 // global

obj.cake()							// 18 // global

apple()								// 19 // global

egg = apple();						// 20 // global

blah=>'hello'						// 21 // global

var mod3 = require('./testFile3.js')	// 22 // global
var mod4 = require('./testFile4.js')	// 23 // global
var mod5 = require('./testFile5.js')	// 24 // global

mod2();								// 25 // global
mod3();								// 26 // global
mod4.func();						// 27 // global
mod5.func();						// 28 // global
mod5.func2();						// 29 // global



 
