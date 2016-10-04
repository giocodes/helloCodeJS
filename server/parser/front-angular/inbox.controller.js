app.controller('InboxCtrl', function($scope, $rootScope, EmailFactory, inboxEmails){
	
	inboxEmails = EmailFactory.sortEmail(inboxEmails);

	$scope.resetInbox = function(){
		$scope.starred = [];
		$scope.unread = [];
		$scope.other = [];

		inboxEmails.forEach(function(email) {
			
			if (EmailFactory.isStarred(email)) {
				email.starThis = true;
				if (EmailFactory.isRead(email)) {
					email.isRead = true;
				} else {
					email.isRead = false;
				}
				$scope.starred.push(email);
			} else {
				email.starThis = false;
				if (EmailFactory.isRead(email)) {
					email.isRead = true;
					$scope.other.push(email);
				} else {
					email.isRead = false;
					$scope.unread.push(email);
				}
			}
		}); 
	};
	$scope.resetInbox();

});