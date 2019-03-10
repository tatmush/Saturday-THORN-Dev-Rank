from flask import Flask, render_template
app = Flask(__name__)
 
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


 
if __name__ == "__main__":
	app.run(debug=True)