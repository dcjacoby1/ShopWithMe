import { useOutletContext } from "react-router-dom"
function CartDirectory(){
    const context = useOutletContext()
    const cartTotal = context.cartTotal
    return(
        <div>
            <p>Item Count: {cartTotal}</p>
            <p>Total Cost: $ </p>
            <button>Cancel Cart</button>
            <button>Place Order</button>
        </div>
    )
}
export default CartDirectory