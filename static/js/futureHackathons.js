/*var config = {
apiKey: "AIzaSyAZG4f0TJr1ANc8NaTkf3NnqSPiO4VzC_U",
authDomain: "dev-rank.firebaseapp.com",
databaseURL: "https://dev-rank.firebaseio.com",
projectId: "dev-rank",
storageBucket: "dev-rank.appspot.com",
messagingSenderId: "754047455655"
};
firebase.initializeApp(config);*/
var token = '';
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
	date.textContent = doc.data().date;
	description.textContent = doc.data().description;
	cross.textContent = 'cancel';

	//li.appendChild(eventName);
	li.appendChild(title);
	//li.appendChild(venue);
	li.appendChild(date);
	//li.appendChild(description);
	li.appendChild(cross);
	devsList.appendChild(li);

	cross.addEventListener('click', (e) => {
		//cancelEvent(e);
	})
	
}

db.collection('events').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderUser(doc);
	})
});

function cancelEvent(){
	e.stopPropagation();
	let id = e.target.parentElement.getAttribute('data-id');
	db.collection('events').doc('id').update({
		state: "cancelled"
	});
}
