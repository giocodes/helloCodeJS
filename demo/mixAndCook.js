module.exports = function(ingredients){
	function preHeatOven(){}
	function mixEvenly(ingredients){return ingredients + "mixed"}
	function cook(time){return time}

	preHeatOven();
	mixEvenly(ingredients);
	cook(20); // for 20 minutes
}