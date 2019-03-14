var config = {
	apiKey: "AIzaSyAZG4f0TJr1ANc8NaTkf3NnqSPiO4VzC_U",
	authDomain: "dev-rank.firebaseapp.com",
	databaseURL: "https://dev-rank.firebaseio.com",
	projectId: "dev-rank",
	storageBucket: "dev-rank.appspot.com",
	messagingSenderId: "754047455655"
};
firebase.initializeApp(config);

db = firebase.firestore();

updateUsername.addEventListener('click', e =>{
	//e.preventDefault();
	console.log("button clicked");
	email = firebase.auth().currentUser.email;
	db.collection("user").where("email", "==", email).get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc){
			var ref = db.collection("user").doc(doc.id);
			return ref.update({
				username: document.getElementById("githubUsername").value
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
});	

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		//set the username and email rendering
		//document.getElementById("username").innerHTML = firebase.auth().currentUser.username;
		document.getElementById("email").innerHTML = firebase.auth().currentUser.email;
		//logout button
		document.getElementById('logout').style.visibility = 'visible';
	}
	else{
		//window.location.href = './login';
		console.log('Not logged in');
		document.getElementById('logout').style.visibility = 'hidden';
		document.getElementById('updateUsername').disabled = false;
		alert("You are not logged in");
	}
});
