import CartItem from "./CartItem";

function CartList({ cartItems, setCartItems }) {
    if (cartItems.length === 0){
        return <p>Cart is empty</p>
    }

    //only displays the cartItem if there is remaining quantity
    const filteredCarts = cartItems.filter(cart => cart.quantity > 0);

    if (filteredCarts.length === 0) {
        return <p>No items in cart</p>;
    }

    const mappedCarts = filteredCarts.map(cart => (
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
    ));

    return (
        <ul className="carts">
            {mappedCarts}
        </ul>
    );
}

export default CartList;