import CartDirectory from "./Cart/CartDirectory"
import CartList from "./Cart/CartList"
import { useState, useEffect } from "react"
function Cart(){
    const [cartItems, setCartItems] = useState([])
    //fetch user cart items
    useEffect(() => {
        fetch("/shopping_carts")
        .then(response => response.json())
        .then(cartItems => {
            if (Array.isArray(cartItems)){ 
                setCartItems(cartItems)
            } else {
                setCartItems([])
            }
        })
      },[])

    if (cartItems.length === 0){
        return <p>Cart is empty</p>
    }

    //only displays the cartItem if there is remaining quantity
    const filteredCarts = cartItems.filter(cart => cart.quantity > 0);

    if (filteredCarts.length === 0) {
        return <p>No items in cart</p>;
    }


    return(
        <main>
        <h2>Cart</h2>
        <CartDirectory setCartItems={setCartItems}/>
        <CartList cartItems={cartItems} setCartItems={setCartItems} filteredCarts={filteredCarts}/>
        </main>
    )
}
export default Cart