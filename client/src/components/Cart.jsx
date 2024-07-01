import CartList from "./Cart/CartList"
import { useState, useEffect } from "react"
function Cart(){
    const [cartItems, setCartItems] = useState([])
    //fetch user cart items
    useEffect(() => {
        fetch("/shopping_carts")
        .then(response => response.json())
        .then(cartItems => setCartItems(cartItems))
      },[])

    return(
        <main>
        <h2>Cart</h2>
        <CartList cartItems={cartItems}/>
        </main>
    )
}
export default Cart