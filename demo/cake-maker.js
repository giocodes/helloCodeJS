var mixAndCook = require('./mixAndCook.js')
// Describe the cake maker
function makeCake(size,flavor){
	let ingredients = [];
	let cake 
	// find recipe
	searchRecipe(flavor);
	
	// get ingredients
	fetchIngredients('/api/shopper')
	.then(ingredient => ingredients.push(ingredient));

	// mix and cook ingredients
	mixAndCook(ingredients)
	.then(result => cake = result);

	// decorate and final touch
	decorate(cake);

	// cake is ready!
	return cake; 
}

// let's start cooking!
makeCake('medium','chocolate');