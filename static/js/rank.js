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
	let username = document.createElement('span');
	let email = document.createElement('span');
	let points = document.createElement('span');

	li.setAttribute('data-id', doc.id);
	username.textContent = doc.data().username;
	email.textContent = doc.data().email;
	points.textContent = doc.data().points;

	const listFromGithub = document.getElementById("listFromGitHub").getElementsByTagName("li"); 
	for(let i = 0; i < listFromGithub.length; i++){
		//console.log(listFromGithub[i].textContent);
		//console.log(username);
		if (listFromGithub[i].textContent == doc.data().username){
			updateBackend(doc.data().username);
		}
	}

	//add list elements to list
	li.appendChild(username);
	li.appendChild(email);
	li.appendChild(points);
	devsList.appendChild(li);
}


db.collection('user').orderBy('points', 'desc').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if(change.type =='modified'){
			devsList.innerHTL='';
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
});

//update backend
function updateBackend(username){
	db.collection("user").where("username", "==", username).get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc){
			var ref = db.collection("user").doc(doc.id);
			return ref.update({
				points: 20
			})
			.then(function(){
				console.log("Update done");
			})
			.catch(function(error){
				console.error(error);
			}); 
		});
	}).catch(function(error){
		console.log("There was an error!" + error);
	});

}

function removeUser(doc){

}