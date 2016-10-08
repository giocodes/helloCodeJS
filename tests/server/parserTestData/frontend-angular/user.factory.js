app.factory('UserFactory', function($http, $rootScope){

	var User = {};

	User.getAllUsers = function(){
		return $http.get('/api/users')
			.then(res=>res.data);
	};

	return User;

})