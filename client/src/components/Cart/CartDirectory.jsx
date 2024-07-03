import { useOutletContext } from "react-router-dom"
function CartDirectory({setCartItems}){
    const context = useOutletContext()
    const setCartTotal = context.setCartTotal
    const cartTotal = context.cartTotal
    const setTotalCost = context.setTotalCost
    const totalCost = context.totalCost
    function cancelCart(){
        fetch('/shopping_carts', {
            method: 'DELETE'
        }).then(res => {
                setCartItems([])
                setCartTotal(0)
                setTotalCost(0)
        })
        .catch(error => {
            console.error('error:', error);
        })
    }

    function placeOrder(){
        fetch('/create_order', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                total_cost : totalCost
            })
        }).then(res => {
            setCartItems([])
            setCartTotal(0)
            setTotalCost(0)
    })
    .catch(error => {
        console.error('error:', error);
    })
    }
    return(
        <div>
            <p>Item Count: {cartTotal}</p>
            <p>Total Cost: ${totalCost}</p>
            <button onClick={cancelCart}>Cancel Cart</button>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    )
}
export default CartDirectory