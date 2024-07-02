import { useOutletContext } from "react-router-dom"
import { useState } from "react"
function CartItem({name, image_url, initialQuantity, price, product_id, setCartItems, cartItems}) {

    const [quantity, setQuantity] = useState(initialQuantity)

    const context = useOutletContext()
    const loggedInUser = context.loggedInUser
    const setCartTotal = context.setCartTotal

    function subtractQuantity(){
        ///subtract_cart_quantity
        fetch('/subtract_cart_quantity', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                product_id: product_id
            })
            }).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setCartTotal(prevCartTotal => prevCartTotal - 1)
                        setQuantity(prevQuantity => {
                            if (prevQuantity - 1 <= 0) {
                                setCartItems(cartItems.filter(item => item.product.id !== product_id))
                            }
                            return prevQuantity - 1;
                        })
                        
                        console.log('item removed')
                    })
                }
            }) 
    }
    function addQuantity(){
        fetch('/add_to_cart', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                product_id: product_id
            })
            }).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setCartTotal(prevCartTotal => prevCartTotal + 1)
                        setQuantity(prevQuantity => prevQuantity + 1)
                    })
                }
            })  
    }
    function deleteItem() {
    fetch('/delete_cart_item', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"  // Add headers if required by your server
        },
        body: JSON.stringify({
            product_id: product_id
        })
    }).then(res => {
        if (res.ok) {
                setCartTotal(prevCartTotal => prevCartTotal - quantity)

                setCartItems(cartItems.filter(item => item.product.id !== product_id));
                
            
        } else {
            console.error("Error removing item:", res.status);
            // Optionally handle different error scenarios based on res.status
        }
    }).catch(error => {
        console.error("Fetch error:", error);
        // Handle network errors or other fetch-related issues
    });
}

    return(
        <li className="product-tile">
            <img src={image_url} alt={name} />
            <h4>{name}</h4>
            <p>Price: ${price * quantity}</p>
            <p>Quantity: {quantity}</p>
            <button onClick={subtractQuantity}>-</button>
            <button onClick={addQuantity}>+</button>
            <button onClick={deleteItem}>remove</button>

        </li>
    )
}
export default CartItem
