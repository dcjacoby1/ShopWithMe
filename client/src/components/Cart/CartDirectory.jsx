import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import API_BASE_URL from "../config"

function CartDirectory({setCartItems}){
    const navigate = useNavigate()
    const context = useOutletContext()
    const setCartTotal = context.setCartTotal
    const cartTotal = context.cartTotal
    const setTotalCost = context.setTotalCost
    const totalCost = context.totalCost
    
    function handleCheckout(){
        fetch(`${API_BASE_URL}/shopping_carts`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(cartItems => {
                    if (cartItems.length > 0) {
                        fetch(`${API_BASE_URL}/create_order`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(res => {
                            if (res.ok) {
                                setCartItems([])
                                setCartTotal(0)
                                setTotalCost(0)
                                navigate('/orders')
                            }
                        })
                    }
                })
            }
        })
    }

    return(
        <div className="cart-directory">
            <p>Item Count: {cartTotal}</p>
            <p>Total Cost: ${totalCost}</p>
            <div>
            <button onClick={handleCheckout} style={{backgroundColor: "#128ff9", border: "none"}}>Checkout</button>
            </div>
        </div>
    )
}
export default CartDirectory