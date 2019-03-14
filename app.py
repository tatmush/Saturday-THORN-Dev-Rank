from flask import Flask, render_template, request, jsonify
from graphQLAPI import graphQL
from firebase import firebase

app = Flask(__name__)

@app.route("/")
@app.route("/login")
def login():
	return render_template("login.html")

@app.route("/index")
def index():
	return render_template("index.html")

@app.route("/ranking")
def ranking():
	#get a list of people from github
	graphQLObj = graphQL()
	listOfPeople = graphQLObj.getClosedIssuesActors()
	#iterate through the list of people who closed issues and award points
	fb = firebase()
	for person in listOfPeople:
		#{**dict, person: 10}
		#update the comments in the firebase collection
		fb.awardPointsToPerson(person)
	
	return render_template("ranking.html")

@app.route("/hostAhackathon")
def hostAhackathon():
	return render_template("hostAhackathon.html")

@app.route("/profile")
def profile():
	return render_template("profile.html")

@app.route("/futureHackathons")
def futureHackathons():
	return render_template("futureHackathons.html")

@app.route("/verifyUser", methods=['POST'])
def verifyUser():
	content = request.json
	token = content['idToken']
	#decoded_token = auth.verify_id_token(token);
	#uid = decoded_token['uid']
	return ""
 
if __name__ == "__main__":
	app.run(debug=True)