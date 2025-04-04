import CartDirectory from "./Cart/CartDirectory"
import CartList from "./Cart/CartList"
import { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from 'react-router-dom'
import API_BASE_URL from "./config"

function Cart(){
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()
    const context = useOutletContext()
    const loggedInUser = context.loggedInUser

    //fetch user cart items
    useEffect(() => {
        fetch(`${API_BASE_URL}/shopping_carts`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(cartItems => {
            if (Array.isArray(cartItems)){ 
                setCartItems(cartItems)
            } else {
                setCartItems([])
            }
            if (cartItems.length === 0){
                return <p className='empty-page'>Cart Is Empty</p>
            }
        })
      },[])

    if (!loggedInUser) {
        return (<div className='not-logged-in-page'>
            <p>Sign in to view cart</p>
            <button onClick={() => navigate('/auth')}>Sign In</button>
            </div>)
    }


    //only displays the cartItem if there is remaining quantity
    const filteredCarts = cartItems.filter(cart => cart.quantity > 0)


    if (filteredCarts.length === 0) {
        return <p className='empty-page'>Cart Is Empty</p>
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