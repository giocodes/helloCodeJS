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



});