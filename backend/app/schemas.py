from marshmallow import Schema, fields

class UserSchema(Schema):
    username = fields.String()
    password = fields.String()
    name = fields.String()
    dob = fields.Date()
    phone_no = fields.String()
    email = fields.String()