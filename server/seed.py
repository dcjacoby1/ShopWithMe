# Local imports
from app import app
from models import db, Product, User, ShoppingCart, CartItem, Order, OrderItem
from faker import Faker
from random import randint, choice as rc

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
       
        # Clear existing data
        Product.query.delete()
        User.query.delete()
        ShoppingCart.query.delete()
        CartItem.query.delete()
        Order.query.delete()
        OrderItem.query.delete()

        # Create 10 new products
        products = []
        for _ in range(35):
            product = Product(
                name=fake.unique.word().title(),
                price=randint(10, 1000),
                image_url="https://picsum.photos/535/647",
                category=rc(Product.categories)
            )
            db.session.add(product)
            products.append(product)

        # Create 5 new users
        users = []
        for _ in range(5):
            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                password_hash='password',  # Use a generic password
                phone_number=fake.phone_number()
            )
            db.session.add(user)
            users.append(user)

        # # Create shopping carts for each user
        # for user in users:
        #     shopping_cart = ShoppingCart(
        #         user=user
        #     )
        #     db.session.add(shopping_cart)

        #     # Add cart items to the shopping cart
        #     for _ in range(randint(1, 5)):
        #         cart_item = CartItem(
        #             product=rc(products),
        #             shopping_cart=shopping_cart
        #         )
        #         db.session.add(cart_item)

        # # Create orders for each user
        # for user in users:
        #     order = Order(
        #         user=user,
        #         quantity=randint(1, 5),
        #         total_cost=randint(50, 1000)
        #     )
        #     db.session.add(order)

        #     # Add order items to the order
        #     for _ in range(randint(1, 5)):
        #         order_item = OrderItem(
        #             product=rc(products),
        #             order=order,
        #             quantity=randint(1, 10)
        #         )
        #         db.session.add(order_item)

        db.session.commit()
        print("Seeding complete!")
