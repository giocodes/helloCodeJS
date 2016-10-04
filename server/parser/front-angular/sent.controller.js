app.controller('SentCtrl', function($scope, sentEmails, EmailFactory){
	sentEmails = EmailFactory.sortEmail(sentEmails);
	$scope.emails = sentEmails;
	
});