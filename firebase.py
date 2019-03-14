import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

class firebase():

	cred = credentials.Certificate("")
	default_app = firebase_admin.initialize_app(cred)
	db = firestore.client()

	"""docstring for firebase"""
	def __init__(self):
		super(firebase, self).__init__()
		
	
	def awardPointsToPerson(self, person):
		docs = self.db.collection("user").where(u'username', u'==', person).get()
		for doc in docs:
			print(doc.id)
