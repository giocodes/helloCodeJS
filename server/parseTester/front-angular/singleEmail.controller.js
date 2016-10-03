app.controller('SingleEmailCtrl', function($scope, $state, $stateParams, EmailFactory){

	$scope.dropdown = false;

	EmailFactory.getSingleEmail($stateParams.id)
		.then(function(email){
			email.recipientUsers = [];
			email.Recipient.forEach(function(user) {
				email.recipientUsers.push(user.name)
			});

			email.copiedUsers = [];
			email.Copied.forEach(function(user) {
				email.copiedUsers.push(user.name)
			});
			
			if (EmailFactory.isStarred(email)) {
				email.starThis = true;
			} else {
				email.starThis = false;
			}

			if (!email.subject) {
				email.subject = "(no subject)"
			}
			if (!email.body) {
				email.body = "(no body)"
			}
			
			$scope.email = email;
		})

	$scope.toggleStar = function(email, $event){
		$event.stopPropagation();
		email.starThis = !email.starThis;
		EmailFactory.toggleStar(email);
	};

	$scope.markUnread = function(email) {
		EmailFactory.toggleRead(email)
		.then(function(){
			$state.go('inbox');
		});	
	};

	$scope.delete = function(email) {
		EmailFactory.deleteEmail(email)
		.then(function(){
			$state.go('inbox');
		});	
	}

});