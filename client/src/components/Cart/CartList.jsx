import CartItem from "./CartItem";

function CartList({cartItems}){
    const mappedCarts = cartItems.map(cart => <CartItem key={cart.id} name={cart.product.name} image_url={cart.product.image_url} quantity={cart.quantity} price={cart.product.price}/>)
    return(
        <ul className="carts">{mappedCarts}</ul>
    )
}
export default CartList