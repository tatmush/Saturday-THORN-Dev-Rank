var config = {
apiKey: "AIzaSyAZG4f0TJr1ANc8NaTkf3NnqSPiO4VzC_U",
authDomain: "dev-rank.firebaseapp.com",
databaseURL: "https://dev-rank.firebaseio.com",
projectId: "dev-rank",
storageBucket: "dev-rank.appspot.com",
messagingSenderId: "754047455655"
};
if(!firebase.apps.length){
	firebase.initializeApp(config);
}

var token = '';
//const db = firebase.firestore();

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		token = firebaseUser.uid;
	}
	else{
		//disable submit button
		document.getElementById("addHackathonButton").disabled = true;
		document.getElementById("addHackathonButton").style.backgroundColor = "gray";
		//hide logout button
		console.log('Not logged in');
		document.getElementById('logout').style.visibility = 'hidden';
		
	}
});

const hackathonForm = document.querySelector('#addHackathon');

//saving data
hackathonForm.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log(token);
	db.collection('events').add({
		organizer: token,
		eventName: hackathonForm.eventName.value,
		title: hackathonForm.title.value,
		venue: hackathonForm.venue.value,
		datetime: firebase.firestore.Timestamp.fromDate(new Date(hackathonForm.date.value + " " + hackathonForm.time.value)),
		description: hackathonForm.description.value
	});
	hackathonForm.eventName.value = '';
	hackathonForm.title.value = '';
	hackathonForm.venue.value = '';
	hackathonForm.date.value = '';
	time: hackathonForm.time.value = '',
	hackathonForm.description.value = '';

	alert("You have successfully created an event");

});