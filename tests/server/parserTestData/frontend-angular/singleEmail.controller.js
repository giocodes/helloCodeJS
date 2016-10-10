app.controller('SingleEmailCtrl', function($scope, $rootScope, $state, $stateParams, EmailFactory){

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

	$scope.newEmail = function(type) {
		var replyEmail = {};
		replyEmail.recipients = [];
		replyEmail.copied = [];
		replyEmail.subject = "Re: " + $scope.email.subject;
		replyEmail.body = "\n\n------------------------------------------\n\nFrom: " + $scope.email.Sender.name + "\nTo: " + $scope.email.recipientUsers.join(', ') + "\ncc: " + $scope.email.copiedUsers.join(', ') + "\n\n" + $scope.email.body;
		if (type === 'reply') {
			replyEmail.recipients = [$scope.email.Sender];
		} else if (type === 'reply all') {
			replyEmail.recipients = [$scope.email.Sender];
			$scope.email.Recipient.forEach(function(recipient){
				if (recipient.id !== $scope.email.Sender.id) {
					replyEmail.recipients.push(recipient);
				}
			});
			replyEmail.copied = $scope.email.Copied;
		} else if (type === 'forward') {
			replyEmail.subject = "Fwd: " + $scope.email.subject;
		}
		$rootScope.$broadcast('compose', replyEmail)
	}

});