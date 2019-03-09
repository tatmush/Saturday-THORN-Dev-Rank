// Initialize Firebase
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

	//sign in
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
	
});

signUp.addEventListener('click', e => {
	const email = getInputVal('email');
	const pass = getInputVal('password');
	const auth = firebase.auth();

	//sign in
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));

});

logout.addEventListener('click', e => {
	firebase.auth().signOut();
})
//get form values
function getInputVal(id){
	return document.getElementById(id).value;
}

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		document.getElementById('logout').style.visibility = 'visible';
	}
	else{
		console.log('Not logged in');
		document.getElementById('logout').style.visibility = 'hidden';
	}
});

