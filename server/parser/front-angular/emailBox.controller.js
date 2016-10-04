app.controller('EmailBoxCtrl', function($scope, EmailFactory){
	
	$scope.toggleStar = function(email, $event){
		$event.stopPropagation();
		email.starThis = !email.starThis;
		EmailFactory.toggleStar(email);
	};

	$scope.markRead = function(email) {
		if (!email.isRead) {
			EmailFactory.toggleRead(email);
		}
	}

});