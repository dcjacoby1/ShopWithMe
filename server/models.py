from sqlalchemy import MetaData, func
from sqlalchemy.orm import validates


from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-orders.user','shopping_carts.user')

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable = False)
    _password_hash = db.Column(db.String, nullable = False)
    phone_number = db.Column(db.Integer, nullable = True)

    shopping_carts = db.relationship('ShoppingCart', back_populates='user', cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')



    #encrypts password
    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    #Create an authenticate method that uses bcyrpt to verify the password against the hash in the DB with bcrypt.check_password_hash
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
class ShoppingCart(db.Model, SerializerMixin):
    __tablename__ = 'shopping_carts'
    serialize_rules = ('-user.shopping_carts', '-cart_items.shopping_cart')

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)
    placed = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    user = db.relationship('User', back_populates='shopping_carts')
    cart_items = db.relationship('CartItem', back_populates='shopping_cart', cascade='all, delete-orphan')

class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'
    serialize_rules = ('-shopping_cart.cart_items', '-product.cart_items')

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    shopping_cart_id = db.Column(db.Integer, db.ForeignKey('shopping_carts.id'), nullable=False)

    shopping_cart = db.relationship('ShoppingCart', back_populates='cart_items')
    product = db.relationship('Product', back_populates='cart_items')

    

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    serialize_rules = ('-user.orders', '-order_items.order')

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)
    #can use property method for this
    total_cost = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # placed = db.Column(db.Boolean, nullable=False, default=1)

    user = db.relationship('User', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')


class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'
    serialize_rules = ('-order_items.product', '-cart_items.product')

    categories = ['board', 'active','accessories', 'outdoors', 'video_digital', 'video_physical']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    # in_stock = db.Column(db.Boolean, nullable=False, default=True)
    category = db.Column(db.String, nullable=False)

    order_items = db.relationship('OrderItem', back_populates='product', cascade='all, delete-orphan')
    cart_items = db.relationship('CartItem', back_populates='product', cascade='all, delete-orphan')
    #make validation for categories

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'
    serialize_rules = ('-order.order_items', '-product.order_items')

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    order = db.relationship('Order', back_populates='order_items')
    product = db.relationship('Product', back_populates='order_items')

