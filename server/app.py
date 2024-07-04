#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,  make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Product, ShoppingCart, CartItem, Order

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
    def delete(self):
        user_id = session['user_id']
        if not user_id:
            return {"error": "User not authenticated"}, 401
        user = User.query.filter(User.id == user_id).first()
        if not user:
            return {"error": "User not found"}, 404
        session.pop('user_id', None)
        db.session.delete(user)
        db.session.commit()
        return '', 204
    def patch(self):
        user_id = session.get('user_id')
        if not user_id:
            return {"error": "User not authenticated"}, 401
        user = User.query.filter(User.id == user_id).first()
        if not user:
            return {"error": "User not found"}, 404
        try:
            params = request.json
            check_email = User.query.filter(User.email == params.get('email')).first()
            if check_email and check_email.id != user_id:
                return make_response({"error": "Email already exists"}, 409)
            for attr in params:
                setattr(user, attr, params[attr])
            db.session.commit()

            return make_response(user.to_dict(), 202)
        
        except ValueError as v_error:
            return make_response({'errors': str(v_error)}, 400)

api.add_resource(Users, '/users')

class Products(Resource):
    def get(self):
        products = Product.query.all()
        product_list = [product.to_dict() for product in products]
        return make_response(product_list, 200)
api.add_resource(Products, '/products')

class CartTotal(Resource):
    def get(self):
        user_id = session['user_id']
        if not user_id:
            return {"error": "User not authenticated"}, 401
        cart = ShoppingCart.query.filter_by(user_id=user_id, placed=False).first()
        if not cart:
            total = 0
            return {'total': total}
        cart_items = CartItem.query.filter_by(shopping_cart_id=cart.id).all()
        if not cart_items:
            total = 0
            return {'total': total}
        quantity = [cart_item.quantity for cart_item in cart_items]
        total = 0
        for i in quantity:
            total += i
        return {'total': total}
    
api.add_resource(CartTotal, '/cart_total')

class CartTotalPrice(Resource):
    def get(self):
        user_id = session['user_id']
        cart = ShoppingCart.query.filter_by(user_id=user_id, placed=False).first()
        if not cart:
            total = 0
            return {'total': total}
        cart_items = CartItem.query.filter_by(shopping_cart_id=cart.id).all()
        if not cart_items:
            total = 0
            return {'total': total}
        price = [(cart_item.quantity * cart_item.price) for cart_item in cart_items]
        total = 0
        for i in price:
            total += i
        return {'total': total}
    
api.add_resource(CartTotalPrice, '/cart_total_price')
    

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
        return {"message": "Item added to cart successfully"}, 201

api.add_resource(AddToCart, '/add_to_cart')

class DeleteCartItem(Resource):
    def delete(self):
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
            return {"error": "Cart not found"}, 404
        
        cart_item = CartItem.query.filter_by(shopping_cart_id=cart.id, product_id=product_id).first()
        if not cart_item:
            return {"error": "Cart item not found"}, 404
        db.session.delete(cart_item)
        db.session.commit()
        return '', 204
api.add_resource(DeleteCartItem, '/delete_cart_item')

class SubtractCartQuantity(Resource):
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
            return {"error": "Cart not found"}, 404
        
        cart_item = CartItem.query.filter_by(shopping_cart_id=cart.id, product_id=product_id).first()
        if not cart_item:
            return {"error": "Cart item not found"}, 404
        if cart_item.quantity == 0:
            db.session.delete(cart_item)
            db.session.commit()
            return '', 204
        cart_item.quantity -= 1
        db.session.commit()
        return make_response(cart_item.to_dict(), 201)


api.add_resource(SubtractCartQuantity, '/subtract_cart_quantity')
        


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
    
    def delete(self):
        user_id = session.get('user_id')

        if not user_id:
            return {"error": "User not authenticated"}, 401
        shopping_cart = ShoppingCart.query.filter_by(user_id=user_id, placed=False).first()
        if not shopping_cart:
            return {"note": "cart is empty"}, 400
        cart_items = CartItem.query.filter(CartItem.shopping_cart_id == shopping_cart.id).all()
        try:
            for cart_item in cart_items:
                db.session.delete(cart_item)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
    
api.add_resource(ShoppingCarts, '/shopping_carts')

class CreateOrder(Resource):
    def post(self):
        params = request.json
        user_id = session['user_id']
        if not user_id:
            return {"error": "User not authenticated"}, 401
        cart = ShoppingCart.query.filter_by(user_id=user_id, placed=False).first()
        if not cart:
            return {"error": "Cart not found"}, 404
        try:
            cart.placed = True   
            db.session.commit()

            order = Order(
                total_cost = params.get('total_cost'),
                quantity = params.get('quantity'),
                user_id = user_id
            )
            db.session.add(order)
            db.session.commit()
            return make_response(order.to_dict(), 201)

        except Exception as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(CreateOrder, '/create_order')

class Orders(Resource):
    def get(self):
        user_id = session['user_id']
        if not user_id:
            return {"error": "User not authenticated"}, 401
        orders = Order.query.filter(Order.user_id == user_id).all()
        if not orders:
            return {"note": "No orders placed"}, 200
        sorted_orders = sorted(orders, key=lambda order: order.created_at, reverse=True)
        orders_list = [order.to_dict() for order in sorted_orders]
        return make_response(orders_list, 200)

api.add_resource(Orders, '/orders')


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
            return make_response(user.to_dict(), 200)
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

