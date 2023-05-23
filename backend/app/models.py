from app import db

class User(db.Model):
    username = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))
    dob = db.Column(db.Date)
    phone_no = db.Column(db.String(15))
    email = db.Column(db.String(100), unique=True)

    def __init__(self, username, password, name, dob, phone_no, email):
        self.username = username
        self.password = password
        self.name = name
        self.dob = dob
        self.phone_no = phone_no
        self.email = email
