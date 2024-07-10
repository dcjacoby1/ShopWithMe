# Local imports
from app import app
from models import db, Product, User, ShoppingCart, CartItem, Order, OrderItem
from faker import Faker
from random import shuffle, randint, choice as rc

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

        # Create 48 new products
        products = [
            Product(name="Catan", price=85, image_url="https://images.thimbletoys.com/images/items/2030360a.jpg", category="board"),
            Product(name="Life", price=25, image_url="https://m.media-amazon.com/images/I/81s1uoBIf0L._AC_UF894,1000_QL80_.jpg", category="board"),
            Product(name="Monopoly", price=25, image_url="https://www.nbcstore.com/cdn/shop/products/LAO-MBG.jpg?v=1670015478", category="board"),
            Product(name="Chess", price=55, image_url="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQpxqIQ9yaHHOd-TU_R5hx5F5VuBd4ZcpR2gQl-hJXmHGQglg4YJgatxM0GJ88vjPa80a-c_pIcWX-zNH3ElJwEgcwqmZSwQLQr2LCTN-ZAPvcytAcALYATSyTAS5DQLbaxhYuf6A&usqp=CAc", category="board"),
            Product(name="Stratego", price=30, image_url="https://m.media-amazon.com/images/I/81+mvRd6WvL.jpg", category="board"),
            Product(name="Codenames", price=30, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnchANHYI4DFoT4O0rZyweiwRdRQZzIbE6ZA&s", category="board"),
            Product(name="Ticket To Ride", price=45, image_url="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ7sTXd0rI1wVfVRlqODm4pbkZEQfm34u_Y565lxE4Quphn0-WLrcr4XVJ8cLvxY1oRq3RoyBDZCAxlnHbrSOK73Xmet31d96zJ2JJDe4SwSlKy0CFjn6_Wge_LfhRm6QEDW-3d02A&usqp=CAc", category="board"),
            Product(name="D & D", price=65, image_url="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQW8J58Qxq8NQy-Lcx1yNYR9hpFRxS7RNbyNF0Qm6S6dZDr89J9Oec7jpXuSRrUT1_Iaqfqqae0SRq2xN0ZXqEGDj3hP-V1RaIIys2nekfhQFjoJ48WBRUnm8TlrcxmTn7pfoH333c&usqp=CAc", category="board"),
            Product(name="Pickleball", price=50, image_url="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQhmK2IEbBLNfJmcZ3Z0Mgxl1ctsHyz7lWWbfrXcTpq2-FAwXTq3ZC5IUgE2PzzllzGopJqRsZ2WYA_F8BITwxInrA_Ha53oo6ARSQUhHhoezd2ICybSoenlneN46HS3wJ7zA3Qk80Vn9c&usqp=CAc", category="active"),
            Product(name="Basketball Hoop", price=150, image_url="https://www.escaladesports.com/cdn/shop/products/silverbacknxtfixedheightwallmount_basketballgoal-wallmount_b8417w_1.jpg?v=1656335905", category="active"),
            Product(name="Soccer Goal", price=65, image_url="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTafAkyRPeLBczxXR6sAE7PAOWFdxGJWU-PSs4pn3rny3afckO1UYn417FxKc1RkurvtFxqNARhCugJcaas8FfHOtPmr0_YUYceLhbZkPtNSmAh2HTeiIcT9bG5JeO4e53inLqa1vM&usqp=CAc", category="active"),
            Product(name="Hockey Goal", price=45, image_url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTlEF4IYT5-T4BODkC3ti4bnEdAEgpUyH0rq2xn_LW_DMyWbeizi8btt_yv3sq_0-ckUIuJZP8seDgf1-o1iygUEmRppb-ZfQcjt34ehn3Bc0Lv8lcd12ZheOU1eYLcSLmkzebQGT8&usqp=CAc", category="active"),
            Product(name="Boxing Gloves", price=35, image_url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQWITm85ulrL7z04ohHovps8i0YvA8FU_tUj0E2qmL0sUBwxdtmLy-N9_b3heut2DpjneYzKzKs99yRrx1uxxYzx5cyKFyCc4zZp04EqNsS", category="active"),
            Product(name="Baseball Glove", price=85, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjHGtp3dN6elemraVUaSjHVxTZLsA3tCyWuQ&s", category="active"),
            Product(name="Flag Football", price=45, image_url="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT5bakox59byGJR0eMmrOV5SrGVvEFkXy5gnMba6XyDW4U_Y_5qCQ0uME0riloDc0ORGxtOdYPyihW3R2iz3d7pTvVF_KJ8YAWyacWYCzEyBMCX-1D5hXZ7InH9XHPsWWoFRGsFY_IgmoQ&usqp=CAc", category="active"),
            Product(name="Golf Clubs", price=350, image_url="https://m.media-amazon.com/images/I/81xDONQqEVL.__AC_SX300_SY300_QL70_FMwebp_.jpg", category="active"),
            Product(name="Cornhole", price=250, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMIQKVRcHtxaAAyz9HYi1zQ01RZ_P6DjCIpw&s", category="outdoors"),
            Product(name="Spikeball", price=75, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH9PXB3x1WzS13oel6kWShiao2k1T2UBr_-Q&s", category="outdoors"),
            Product(name="Horseshoes", price=225, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCQnxRLhZJNfJe-HAGpeyqAqvOISyabpAcQ&s", category="outdoors"),
            Product(name="Kanjam", price=45, image_url="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ4w_Fr3m49plr0vd58bRAabfOBT2UW-sGbw12Jzf6m1kp0SELoDBrdOgmDHcAtULCt6OphCYddIVF4QcxrMIDYLsNZdlMYHCOYiGMNDH5lxb2ACEUSWOYbdOWvY-v5wxL-VdNSSuk&usqp=CAc", category="outdoors"),
            Product(name="Croquet", price=175, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQe87vPKhMy045GUqyjL8UtKIX75zrwj13Ug&s", category="outdoors"),
            Product(name="Giant Jenga", price=55, image_url="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ1duoZVYgXd_9qLnI_XKe9YZigd7KCzQMWqztnzxznX-F0I6kIpHvA9DiZ9C2ELKc2DFI_sP-5-DvQew_dQ5p_B6mG89r3W5EMBuST-dBblnfmzYPB58N5LnJvCZUiYHMJvZwgYA&usqp=CAc", category="outdoors"),
            Product(name="Bocce Ball", price=75, image_url="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR4QeIIwE7DnoALaCspWiQ0LEUlqEnSEtfGWPuO6C80qaTpm1t1En6skbGyj9sOT-ONqRIJq4QSXli4yjuiDOwWj6osrv4-wV8qYNJjqN2h_XK6WlPAcmuNN0L9Hp1X36j5M0KI3Q&usqp=CAc", category="outdoors"),
            Product(name="Frisbee", price=15, image_url="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQqM5nIk4CFug5hxw1_zW8ZRt1R9Lpp_asjewmZ3O1hmbPasMGV0h-C7UjvZIxeZoNe2xBlGhu5x8VfsWzWHZDqrkoFyWEszJwb_74u4PVXEUXbRDzJi1qcEX9bA8WJ&usqp=CAc", category="outdoors"),
            Product(name="Minecraft", price=30, image_url="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTtEQo_-ax6GwLazz_AymW_zXx-m7M1QIBbC5t27l_D5-m8vXT6iJ1UagsZ_DvkXhr_sAoBo9CYfbtqCMiam30bsf_Fx63XRYk3mooOE8bpf7J29H3JBHBFDqz0JKDfKfLd4mywEd7zGX4&usqp=CAc", category="video_physical"),
            Product(name="Fifa 24", price=50, image_url="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT7Zi1-ds_uyrZ9X1001qH8MdHOkkJHmTvGrM2m5utnYFG2f6Ifh33-9jsUyVCgMTNKyLArEVbHtf05yNZfd6yl5ZNOYF-Cdynh5MzBugVrr68PegQgnAC5VpOZPiK_ug&usqp=CAc", category="video_physical"),
            Product(name="COD: Black Ops 6", price=70, image_url="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYrN8QPacjK-WmBCQLn20b9PYlEc_OmxBGlrHT-9MjTxhxFdJ3FefrAWKkJY9Am6G5PgarO0Pfe1JCTpEmy8s9jvZp3D-gxSoo7NdSpSuAqGBFK04eVXsx_Nb_EzKg-im9I-jIrw&usqp=CAc", category="video_physical"),
            Product(name="Formula1 24", price=70, image_url="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRbm-I9mx1nsng1Bj--R0U-2cMGqrfnr-jjoOdTiANl6Ns5bxsytR5LZjPgr8CwPyr-0kZ7R-Fh1Zr3dnznFjsg_Au_KYB5Q0zrw49mSinhnkrzxDlQRcUbg4J5WZEXKg&usqp=CAc", category="video_physical"),
            Product(name="College Football", price=100, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDzp40Qgqwi3Zj6XX4FTM8K5gK1pWmCmSZQ&s", category="video_physical"),
            Product(name="NBA 2K24", price=50, image_url="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTeo8FhX-mRO-dstkcvBQfi187Lq_jVg5Wf520JlAc2d_oPDMXSPxavou6E3UEs2o_PwwZvJEYkAxtLyc7d0Kb7JkdQa9pD8A2LUiB5RZ6x2C3ntSKNSYEtAiLyNSvCrAJZmw0tu1OrgO4&usqp=CAc", category="video_physical"),
            Product(name="Assassins Creed", price=70, image_url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQi1nfKq4GhW2UnOf_ZkxvcxEDep8tptM9Ns4fbhLy2qbJ5EY8l088aBVofxH7Ou-sS_FRDamYTBsbPGbTjiXjlzBlcvSjBH8jTjoh_YeT13ac7CHn6qxTQN9V2sbVpxfVVerWemg&usqp=CAc", category="video_physical"),
            Product(name="Halo Infinite", price=30, image_url="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRdlRLz_9o2EbSeK-j8WdMUGbo2i4Xuq1UXPyptlUWv8AfPUsMReJMJWQoRTXIgMHbuV-xKsMlz8ss6coF8XzwNurwnxnDT_e3QtLrLTXaHlTp81mFipTgoGGEDJnGt1RrQjw0TIg&usqp=CAc", category="video_physical"),
            Product(name="Soccer Ball", price=45, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6W79cKqoFwkReD5n8FwZM_99dvUU4OGAoQQ&s", category="accessories"),
            Product(name="Tennis Balls", price=120, image_url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpluzN1P7qTabHzCGl8jgTTX3JCdelZZJwKBmMVOKdMvBXgt6R9WPiJDhyH2lg4rqCkEYPeX4IP09HcDPwTsWbUumK2V3YpkLrvdUYcE4L5qBPfYmcQuRsedbKY2tBqcrVXVL7hw&usqp=CAc", category="accessories"),
            Product(name="Footbal", price=35, image_url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-PV4R8vqm2zrBb0HAQ4ayrH5xzWdpevbpGH5Hp7qhtiFPmiph6WbtTV3O8z-g1rfMRhW8W3OeYsKk6Q0BicIFpfAIOFq5c2OlargeLdx0sxCucGcNiMezmi665bJq1HAHRzg7CIFr&usqp=CAc", category="accessories"),
            Product(name="Basketball", price=60, image_url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTKukmR611GNUvys_Ku_Qg7WedDbrKNuULN6hJ3H00HB3k_FM9ptDAQZH6VQQDNI6-HvwpoRm1JmgU7E7Kydzas5LkX8rGBOkmlOLBTGvFmcutP85ARuU0ThwiIvFSPejNauY1XMqM&usqp=CAc", category="accessories"),
            Product(name="Golf Balls", price=55, image_url="https://cdns.crestline.com/master/107565/web/107565_90A.jpg?s=600", category="accessories"),
            Product(name="Hockey Balls", price=25, image_url="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQz79O-T97AgOfYJl6S5ef0wMGXzno5z57AImwcAtjF0rJAiJyscX9xamhONYzem5zOVsEibqkwBbzIS7PmVab9Cj1jPlF9iIoGDBgSW7_dyPD-GiZ13TDAiMzq59Ftz9mF_s0-gMc&usqp=CAc", category="accessories"),
            Product(name="Volleyball", price=40, image_url="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRiYcQSuhmPwziutygf_6xwZ2zDX7id-pO1kZgTAtpsG37t_5fu8OdKhhtpSwV5JRb5o_v7DSXlX8AhOsn2NSplQx0gQlJPtqC4tgQ1quCDCpMWPMoKmcxfsR8oQdpeyvRnEHq5PA&usqp=CAc", category="accessories")
        ]

        shuffle(products)
        for product in products:
            db.session.add(product)
        # for _ in range(35):
        #     product = Product(
        #         name=fake.unique.word().title(),
        #         price=randint(10, 1000),
        #         # image_url="https://picsum.photos/535/647",
        #         image_url=f"https://picsum.photos/seed/{fake.uuid4()}/535/647",
        #         category=rc(Product.categories)
        #     )
        #     db.session.add(product)
        #     products.append(product)

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
