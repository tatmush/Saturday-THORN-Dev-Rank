// Initialize Firebase
window.onload = function() {


var config = {
apiKey: "AIzaSyAZG4f0TJr1ANc8NaTkf3NnqSPiO4VzC_U",
authDomain: "dev-rank.firebaseapp.com",
databaseURL: "https://dev-rank.firebaseio.com",
projectId: "dev-rank",
storageBucket: "dev-rank.appspot.com",
messagingSenderId: "754047455655"
};
firebase.initializeApp(config);

//user tokenID
var token = '';
//getting the database instance
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		document.getElementById('logout').style.visibility = 'visible';
		firebase.auth().currentUser.getIdToken(true).then(function(idToken){
			window.location.href = './index';
			console.log(idToken);
		}).catch(function(error){
			alert('Something went wrong');
		});
	}
	else{
		//window.location.href = './login';
		console.log('Not logged in');

		//document.getElementById('logout').style.visibility = 'hidden';
	}
});
//---------------------------------------------------LOGIN

if (document.URL.includes("login")){
	
	hasLoad = true;

	//login button
	login.addEventListener('click', e => {
	const email = getInputVal('email');
	const pass = getInputVal('password');
	const auth = firebase.auth();

	//sign in
	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => alert('Try again' + e.message));
	
});
	//sign up button
	signUp.addEventListener('click', e => {
	const email = getInputVal('email');
	const pass = getInputVal('password');
	const auth = firebase.auth();

	//sign in
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => alert('Try again' + e.message));

});

logout.addEventListener('click', e => {
	firebase.auth().signOut();
});

//get form values
function getInputVal(id){
	return document.getElementById(id).value;
}

}

//--------------------------------------------------futureHackathon

if(document.URL.includes("futureHackathons")){
	const devsList = document.querySelector('#devsList');

function renderEvents(doc){
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
		renderEvents(doc);
	})
});

function cancelEvent(){
	e.stopPropagation();
	let id = e.target.parentElement.getAttribute('data-id');
	db.collection('events').doc('id').update({
		state: "cancelled"
	});
}
}


//----------------------------------------host

if(document.URL.includes("hostAhackathon")){
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

}


//-------------------------------------------------rank.js
if(document.URL.includes("ranking")){
	//const devsList = document.querySelector('#devsList');

//create element and render user
function renderUser(doc){
	let li = document.createElement('li');
	let name = document.createElement('span');
	let points = document.createElement('span');

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().username;
	points.textContent = doc.data().points;

	li.appendChild(name);
	li.appendChild(points);
	devsList.appendChild(li);
}

db.collection('user').orderBy('points', 'desc').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderUser(doc);
	})
});

db.collection('user').orderBy('points', 'desc').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if(change.type =='modified'){
			renderUser(change.doc);
		}
		else if(change.type == 'added'){
			renderUser(change.doc);
		}
		else if(change.type == "removed"){
			let li = devsList.querySelector('[data-id=' + change.doc.id + ']');
			devsList.removeChild(li);
		}
	})
})

}

}