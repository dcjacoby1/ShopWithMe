#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,  make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

#returns list of all Users
class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(users_list, 200)

#checks to see if user is logged in
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = db.session.get(User, user_id)
            if user:
                return make_response(user.to_dict(), 200)
        return make_response({'error': 'Unauthorized: Must login'}, 401)

api.add_resource(CheckSession, '/check_session')

#creates a new user
class SignUp(Resource):
    def post(self):
        params = request.json
        email=params.get('email')
        if User.query.filter_by(email=email).first():
            return make_response({"error": "email already exists"}, 401)
        try:
            user = User(
                first_name=params.get('first_name'),
                last_name=params.get('last_name'),
                email=params.get('email'),
                phone_number=params.get('phone_number')
            )
            user.password_hash = params.get('password')
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(SignUp, '/signup')


#user login
class Login(Resource):
    def post(self):
        params = request.json
        user = User.query.filter_by(email=params.get('email')).first()
        if not user:
            return make_response({'error': 'user not found'}, 404)

        if user.authenticate(params.get('password')):
            session['user_id'] = user.id
            return make_response(user.to_dict())
        else:
            return make_response({'error': 'invalid password' }, 401)

api.add_resource(Login, '/login')

#user logout
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

