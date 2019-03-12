
var config = {
apiKey: "AIzaSyAZG4f0TJr1ANc8NaTkf3NnqSPiO4VzC_U",
authDomain: "dev-rank.firebaseapp.com",
databaseURL: "https://dev-rank.firebaseio.com",
projectId: "dev-rank",
storageBucket: "dev-rank.appspot.com",
messagingSenderId: "754047455655"
};
firebase.initializeApp(config);

login.addEventListener('click', e => {
	const email = getInputVal('email');
	const pass = getInputVal('password');
	const auth = firebase.auth();

	console.log("login button");
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.then(function(){
		firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  		// Send token to your backend via HTTPS
  		var xhr = new XMLHttpRequest();
			xhr.open("POST", document.URL.slice(0, 30) + "/verifyUser", true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify({
				idToken: "1234"
			}));
		}).catch(function(error) {
  		alert("cannot send value");
		});

		window.location.href = './index';
	});
	promise.catch(e => alert('Try again' + e.message));
	
});

//sign up
signUp.addEventListener('click', e => {
	const email = getInputVal('email');
	const pass = getInputVal('password');
	const auth = firebase.auth();

	console.log("signup button");
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => alert('Try again' + e.message));

});

//get form values
function getInputVal(id){
	return document.getElementById(id).value;
}

