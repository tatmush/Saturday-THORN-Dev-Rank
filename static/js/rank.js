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
