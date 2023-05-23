from flask import Flask, jsonify
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000']) # Allow CORS for frontend on port 3000
app.config.from_pyfile('config.py')  # Load configuration from config.py
ma = Marshmallow(app)
db = SQLAlchemy(app)


# Register blueprints
from app.routes.user import user_bp

app.register_blueprint(user_bp)


# Init db
from app.models import User
from datetime import date

@app.before_first_request
def create_tables():
    db.create_all()

    # Insert data if the User table is empty
    if User.query.count() == 0:
        users = [
            User('john_doe', 'password', 'John Doe', 
                 date(1990, 5, 10), '1234567890', 'john@example.com'),
            User('jane_smith', 'password', 'Jane Smith', 
                 date(1988, 3, 15), '9876543210', 'jane@example.com'),
            User('bob_johnson', 'password', 'Bobby Johnson', 
                 date(1995, 8, 22), '5555555555', 'bob@example.com')
        ]
        db.session.bulk_save_objects(users)
        db.session.commit()
