// Initialize Firebase
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
//getting the database instance
//const db = firebase.firestore();

//user tokenID
var userId = '';

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		document.getElementById('logout').style.visibility = 'visible';
		firebase.auth().currentUser.getIdToken(true).then(function(idToken){
			userId = firebaseUser.uid;
			if(document.URL.includes("login")){
				window.location.href = './index';
			}
			else if (document.URL.includes("hostAhackathon")){
				
			}
			else{
				

			}
			
		}).catch(function(error){
			alert('Something went wrong');
		});
	}
	else{
		//window.location.href = './login';
		console.log('Not logged in');
		document.getElementById('logout').style.visibility = 'hidden';
	}
});

logout.addEventListener('click', e => {
	firebase.auth().signOut();
	console.log("logout button");
	window.location.href = './login';
});


//----------------------------------------host

if(document.URL.includes("hostAhackathon")){
	//const hackathonForm = document.querySelector('#addHackathon');

/*saving data
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
*/
}
