#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,  make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Product, ShoppingCart, CartItem

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
api.add_resource(Users, '/users')

class Products(Resource):
    def get(self):
        products = Product.query.all()
        product_list = [product.to_dict() for product in products]
        return make_response(product_list, 200)
api.add_resource(Products, '/products')

class AddToCart(Resource):
    def post(self):
        params = request.json
        user_id = session['user_id']
        product_id = params['product_id']

        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        product = Product.query.get(product_id)
        if not product:
            return {"error": "Product not found"}, 404

        # Check for existing cart
        cart = ShoppingCart.query.filter_by(user_id=user_id, placed=False).first()

        if not cart:
            # Create a new cart if not exists
            cart = ShoppingCart(user_id=user_id)
            db.session.add(cart)
            db.session.commit()

        # Check if product is already in cart
        cart_item = CartItem.query.filter_by(shopping_cart_id=cart.id, product_id=product_id).first()
        
        if cart_item:
            # Increment quantity if item exists
            cart_item.quantity += 1
        else:
            # Add new item to cart with default quantity of 1
            cart_item = CartItem(
                shopping_cart_id=cart.id,
                product_id=product_id,
                quantity=1
            )
            db.session.add(cart_item)

        db.session.commit()
        return {"message": "Item added to cart successfully"}, 200

api.add_resource(AddToCart, '/add_to_cart')

class ShoppingCarts(Resource):
    def get(self):
        user_id = session.get('user_id')
        
        if not user_id:
            return {"error": "User not authenticated"}, 401
        
        shopping_cart = ShoppingCart.query.filter_by(user_id=user_id, placed=False).first()
        
        if not shopping_cart:
            return {"note": "cart is empty"}, 200
        cart_items = CartItem.query.filter(CartItem.shopping_cart_id == shopping_cart.id).all()
        cart_list = [cart.to_dict() for cart in cart_items]
        return make_response(cart_list, 200)
    
api.add_resource(ShoppingCarts, '/shopping_carts')

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

