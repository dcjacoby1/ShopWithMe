import CartItem from "./CartItem";

function CartList({ cartItems, setCartItems, filteredCarts }) {

    const mappedCarts = filteredCarts.map(cart => 
        <CartItem
            key={cart.id}
            name={cart.product.name}
            image_url={cart.product.image_url}
            initialQuantity={cart.quantity}
            price={cart.product.price}
            product_id={cart.product.id}
            setCartItems={setCartItems}
            cartItems={cartItems}
        />
    );

    return (
        <ul className="carts">
            {mappedCarts}
        </ul>
    );
}

export default CartList;