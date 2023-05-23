from flask import Blueprint, jsonify, request
from datetime import datetime
from app import db
from app.models import User
from app.schemas import UserSchema

# Define user blueprint
user_bp = Blueprint('user_bp', __name__)

# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Create a user
@user_bp.route('/user', methods=['POST'])
def add_user():
    username = request.json['username']
    password = request.json['password']
    name = request.json['name']
    dob = datetime.strptime(request.json['dob'], '%d-%m-%Y').date() # Convert string to date object
    phone_no = request.json['phone_no']
    email = request.json['email']
    new_user = User(username, password, name, dob, phone_no, email)
    
    # Add the new user to the database
    db.session.add(new_user)
    # Commit/Save the changes
    db.session.commit()

    # return body, status code
    return jsonify(user_schema.dump(new_user)), 201

# Get all users
@user_bp.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = users_schema.dump(users) # Serialize the queryset i.e. convert User object python dictionary
   
    return jsonify(user_list), 200

def find_user(username):
    user = User.query.get(username)
    if not user:
        return jsonify({'error': f"User (username:'{username}') not found"}), 404
    return user

# Get Single user
@user_bp.route('/user/<username>', methods=['GET'])
def get_user(username):
    user = find_user(username)
    return jsonify(user_schema.dump(user)), 200

# Update user's details
@user_bp.route('/user/<username>', methods=['PUT'])
def update_user(username):
    user = find_user(username)
    user.password = request.json['password']
    user.name = request.json['name']
    user.dob = datetime.strptime(request.json['dob'], '%d-%m-%Y').date()
    user.phone_no = request.json['phone_no']
    user.email = request.json['email']
    db.session.commit()

    return jsonify(user_schema.dump(user)), 200

# Delete user
@user_bp.route('/user/<username>', methods=['DELETE'])
def delete_user(username):
    user = find_user(username)
    db.session.delete(user)
    db.session.commit()

    return f"User (username: '{username}') has been successfully deleted from the database.", 200