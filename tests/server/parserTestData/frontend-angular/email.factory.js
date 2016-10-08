app.factory('EmailFactory', function($http, $rootScope){

	var Email = {};

	Email.getInbox = function(){
		return $http.get('/api/user/' + $rootScope.currentUser.id + '/inbox')
			.then(res=>res.data);
	};

	Email.getSingleEmail = function(id){
		return $http.get('/api/email/' + id)
			.then(res=>res.data)
	};

	Email.deleteEmail = function(email){
		return $http.delete('/api/user/' + $rootScope.currentUser.id + '/email/' + email.id)
			.then(res=>res.data)
	};

	Email.getSentItems = function(){
		return $http.get('/api/user/' + $rootScope.currentUser.id + '/sent')
			.then(res=>res.data);
	};	

	Email.sendEmail = function(recipients, copied, email){
		return $http.post('/api/email/send', {sender: $rootScope.currentUser.address, recipients: recipients, copied: copied, email: email})
			.then(res=>res.data);
	};

	Email.toggleStar = function(email){
		return $http.put('/api/email/star', {email: email, currentUser: $rootScope.currentUser})
			.then(res=>res.data);
	};

	Email.toggleRead = function(email){
		return $http.put('/api/email/read', {email: email, currentUser: $rootScope.currentUser})
			.then(res=>res.data);
	};

	Email.isStarred = function(email) {
		var recipientIndex = -1;
		var copiedIndex = -1;
		email.Recipient.forEach(function(recipient, index) {
			if (recipient.id === $rootScope.currentUser.id) {
				recipientIndex = index;
			}
		})
		email.Copied.forEach(function(copied, index) {
			if (copied.id === $rootScope.currentUser.id) {
				copiedIndex = index;
			}
		})
		if ((recipientIndex > -1 && email.Recipient[recipientIndex].email_recipient.isStarred) || (copiedIndex > -1 && email.Copied[copiedIndex].email_copied.isStarred)) {
			return true;
		} else {
			return false;
		}
	};

	Email.isRead = function(email) {
		var recipientIndex = -1;
		var copiedIndex = -1;
		email.Recipient.forEach(function(recipient, index) {
			if (recipient.id === $rootScope.currentUser.id) {
				recipientIndex = index;
			}
		})
		email.Copied.forEach(function(copied, index) {
			if (copied.id === $rootScope.currentUser.id) {
				copiedIndex = index;
			}
		})
		if ((recipientIndex > -1 && email.Recipient[recipientIndex].email_recipient.isRead) || (copiedIndex > -1 && email.Copied[copiedIndex].email_copied.isRead)){
			return true;
		} else {
			return false;
		}
	};	

	Email.sortEmail = function(emails) {
		return emails.sort(function(a,b){return b.id-a.id});
	}


	return Email;

})