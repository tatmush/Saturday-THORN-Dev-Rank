var config = {
apiKey: "AIzaSyAZG4f0TJr1ANc8NaTkf3NnqSPiO4VzC_U",
authDomain: "dev-rank.firebaseapp.com",
databaseURL: "https://dev-rank.firebaseio.com",
projectId: "dev-rank",
storageBucket: "dev-rank.appspot.com",
messagingSenderId: "754047455655"
};
firebase.initializeApp(config);

var token = '';
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		//console.log(firebaseUser);
		firebase.auth().currentUser.getIdToken(true).then(function(idToken){
			token = idToken;
			console.log(token);
		}).catch(function(error){
			//alert('Something went wrong');
			console.log(error);
		});
	}
	else{
		console.log('Not logged in');
	}
});

const hackathonForm = document.querySelector('#addHackathon');

//saving data
hackathonForm.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('events').add({
		organizer: token,
		eventName: hackathonForm.eventName.value,
		title: hackathonForm.title.value,
		venue: hackathonForm.venue.value,
		date: hackathonForm.date.value,
		description: hackathonForm.description.value
	});
	hackathonForm.eventName.value = '';
	hackathonForm.title.value = '';
	hackathonForm.venue.value = '';
	hackathonForm.date.value = '';
	hackathonForm.description.value = '';

})