from flask_login import UserMixin

class User(UserMixin):

	def __init__(self, uid ):
		self.uid = uid

	def is_authenticated(self):
		return True

	def is_active(self):
		return True

	def is_anonymous(self):
		return False

	def get_id(self):
		return unicode(self.uid)

	def __repr__(self):
		return '<User %r>' %(self.uid)

	