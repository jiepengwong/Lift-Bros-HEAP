from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


# Init app
app = Flask(__name__)
app.config.from_pyfile('config.py')  # Load configurations from
# Init db
db = SQLAlchemy(app)
# Init Marshmellow
ma = Marshmallow(app)

# User Class/Model
class User(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(100))
    dob = db.Column(db.Date)
    phone_no = db.Column(db.String(15))
    email = db.Column(db.String(100), unique=True)

    def __init__(self, username, name, dob, phone_no, email):
        self.username = username
        self.name = name
        self.dob = dob
        self.phone_no = phone_no
        self.email = email


# User Schema
class UserSchema(ma.Schema):  
    class Meta:
        fields = ('id', 'username', 'name', 'dob', 'phone_no', 'email')


# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Create a user
@app.route('/user', methods=['POST'])
def add_user():
    username = request.json['username']
    name = request.json['name']
    dob = request.json['dob']
    phone_no = request.json['phone_no']
    email = request.json['email']
    new_user = User(username, name, dob, phone_no, email)

    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user)

# Get All users
@app.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)

# Get Single user
@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = user.query.get(id)
    return user_schema.jsonify(user)

# Update a user
@app.route('/user/<id>', methods=['PUT'])
def update_user(id):
    user = user.query.get(id)
    username = request.json['username']
    name = request.json['name']
    dob = request.json['dob']
    phone_no = request.json['phone_no']
    email = request.json['email']

    user.name = name
    user.username = username
    user.dob = dob
    user.phone_no = phone_no
    user.email = email

    db.session.commit()

    return user_schema.jsonify(user)

# Delete user
@app.route('/user/<id>', methods=['DELETE'])
def delete_user(id):
    user = user.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)


# Run Server
if __name__ == '__main__':
    app.run(debug=True)
