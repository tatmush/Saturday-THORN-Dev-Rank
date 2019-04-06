
const config = {
	apiKey: "AIzaSyAZG4f0TJr1ANc8NaTkf3NnqSPiO4VzC_U",
	authDomain: "dev-rank.firebaseapp.com",
	databaseURL: "https://dev-rank.firebaseio.com",
	projectId: "dev-rank",
	storageBucket: "dev-rank.appspot.com",
	messagingSenderId: "754047455655"
};
firebase.initializeApp(config);
const db = firebase.firestore();

//login
login.addEventListener('click', e => {
	const email = getInputVal('email');
	const pass = getInputVal('password');
	const auth = firebase.auth();

	const promise = auth.signInWithEmailAndPassword(email, pass);
	//on successful login
	promise.then(function(){
		firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  		// Send token to your backend via HTTPS
		window.location.href = './index';
		});	
	});
	//catching an error
	promise.catch(e => alert(e.message));
});

//sign up
signUp.addEventListener('click', e => {
	const email = getInputVal('email');
	const pass = getInputVal('password');
	const auth = firebase.auth();
	const points = 0;

	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => alert(e.message));

	db.collection("user").add({
		username: "",
		email: email,
		points: points
	}).then(function(docRef){
		console.log("user created")
	}).catch(function(error){
		console.error(error);
	});

});

//get form values
function getInputVal(id){
	return document.getElementById(id).value;
}

