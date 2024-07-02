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

    return(
        <main>
        <h2>Cart</h2>
        <CartDirectory />
        <CartList cartItems={cartItems} setCartItems={setCartItems}/>
        </main>
    )
}
export default Cart