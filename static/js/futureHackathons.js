
var config = {
	apiKey: "AIzaSyAZG4f0TJr1ANc8NaTkf3NnqSPiO4VzC_U",
	authDomain: "dev-rank.firebaseapp.com",
	databaseURL: "https://dev-rank.firebaseio.com",
	projectId: "dev-rank",
	storageBucket: "dev-rank.appspot.com",
	messagingSenderId: "754047455655"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const devsList = document.querySelector('#devsList');

function renderUser(doc){
	let li = document.createElement('li');
	let eventName = document.createElement('span');
	let title = document.createElement('span');
	let venue = document.createElement('span');
	let date = document.createElement('span');
	let description = document.createElement('span');
	//let organizer = document.createElement('span');
	let cross = document.createElement('div');

	li.setAttribute('data-id', doc.id);
	eventName.textContent = doc.data().eventName;
	title.textContent = doc.data().title;
	venue.textContent = doc.data().venue; 
	description.textContent = doc.data().description;
	cross.textContent = 'cancel';
	date.textContent = doc.data().datetime.toDate();
	
	//li.appendChild(eventName);
	li.appendChild(title);
	//li.appendChild(venue);
	li.appendChild(date);
	//li.appendChild(description);


	li.appendChild(cross);
	devsList.appendChild(li);

	cross.addEventListener('click', (e) => {
		cancelEvent(e);
	})
	
}

db.collection('events').orderBy('datetime', 'desc').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if(change.type =='added'){
			renderUser(change.doc);
		}
		else if(change.type == 'removed') {
			let li = devsList.querySelector('[data-id=' + change.doc.id + ']');
			devsList.removeChild(li);
		}
	})
});

function cancelEvent(e){
	e.stopPropagation();

	firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		let id = e.target.parentElement.getAttribute('data-id');
	firebase.auth().onAuthStateChanged(firebaseUser => {
		var event = db.collection("events").doc(id);
		event.get().then(function(doc) {
    		if (doc.exists) {
    			if(firebaseUser.uid == doc.data().organizer){
					db.collection('events').doc(id).delete();
				}
				else{
					alert('Cannot delete document');
				}
    		} else {
        		// doc.data() will be undefined in this case
        		alert("No such document!");
    		}}).catch(function(error) {
    			console.log("Error getting document:", error);
			});
		
	});
		token = firebaseUser.uid;
	}
	else{
		alert('Not logged in');
	}
});

	
}
