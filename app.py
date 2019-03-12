from flask import Flask, render_template, request, jsonify
from flask_login import LoginManager, current_user, login_user, login_required, logout_user, UserMixin
import firebase_admin
from firebase_admin import credentials, auth
import user

app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return uid

@app.route("/")
@app.route("/login")
def login():
	return render_template("login.html")

@login_required
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