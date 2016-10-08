app.controller('ComposeCtrl', function($scope, $state, EmailFactory){
	
	$scope.discard = function(){
		$scope.content = {};
		$scope.completedRecipients = [];
		$scope.completedCopied = [];
		$scope.show = false;
	};

	$scope.sendEmail = function() {
		EmailFactory.sendEmail($scope.completedRecipients, $scope.completedCopied, $scope.content.email)
		.then(function(){
			$scope.discard();
			$state.go('staging');
		})
	};

	$scope.$on('changeUser', function(){
		$scope.discard();
	})

	$scope.completedRecipients = [];
	$scope.completedCopied = [];

	var replaceNewline = function(input) {
	    var newline = String.fromCharCode(13, 10);
	    return input.replace(/\\n/g, newline);
	}

	$scope.$on('compose', function(event, replyData){
		$scope.discard();
		$scope.show = true;
		replyData.recipients.forEach(function(recipient) {
			$scope.completedRecipients.push(recipient.address);
		})
		replyData.copied.forEach(function(copied) {
			$scope.completedCopied.push(copied.address);
		})
		$scope.content.email = {};
		$scope.content.email.subject = replyData.subject;
		$scope.content.email.body = replaceNewline(replyData.body);
	})

});