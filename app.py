from flask import Flask, render_template, request, jsonify
#import firebase_admin
#from firebase_admin import credentials, auth

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
	return render_template("ranking.html")

@app.route("/hostAhackathon")
def hostAhackathon():
	return render_template("hostAhackathon.html")

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