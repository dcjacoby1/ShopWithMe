import { useOutletContext } from "react-router-dom"
import { useState } from "react"
import API_BASE_URL from "../config"

function CartItem({name, image_url, initialQuantity, price, product_id, setCartItems, cartItems}) {

    const [quantity, setQuantity] = useState(initialQuantity)
    const context = useOutletContext()
    const setCartTotal = context.setCartTotal
    const setTotalCost = context.setTotalCost
  
    //functions to change specific item quantity in cart
    function subtractQuantity(){
        fetch(`${API_BASE_URL}/subtract_cart_quantity`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                product_id: product_id
            })
            }).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setTotalCost(prevTotalCost => prevTotalCost - data.product.price)
                        setCartTotal(prevCartTotal => prevCartTotal - 1)
                        setQuantity(prevQuantity => {
                            if (prevQuantity - 1 <= 0) {
                                setCartItems(cartItems.filter(item => item.product.id !== product_id))
                            }
                            return prevQuantity - 1
                        })
                        
                        console.log('item removed')
                    })
                }
            }) 
    }

    function addQuantity() {
        fetch(`${API_BASE_URL}/add_to_cart`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                product_id: product_id
            })
            }).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setTotalCost(prevTotalCost => prevTotalCost + price)
                        setCartTotal(prevCartTotal => prevCartTotal + 1)
                        setQuantity(prevQuantity => prevQuantity + 1)
                    })
                }
            })  
    }

    function deleteItem() {
        fetch(`${API_BASE_URL}/delete_cart_item`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                product_id: product_id
            })
        }).then(res => {
            if (res.ok) {
                setCartTotal(prevCartTotal => prevCartTotal - quantity)
                setTotalCost(prevTotalCost => prevTotalCost - (quantity * price))
                setCartItems(cartItems.filter(item => item.product.id !== product_id));
            } else {
                console.error("Error removing item:", res.status);
            }
        }).catch(error => {
            console.error("Fetch error:", error);
        });
    }

    return (
        <li className="cart-item">
            <img src={image_url} alt={name} />
            <div className="cart-item-details">
                <h4>{name}</h4>
                <p>${price}</p>
                <div className="quantity-controls">
                    <button onClick={subtractQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={addQuantity}>+</button>
                </div>
                <button onClick={deleteItem}>Remove</button>
            </div>
        </li>
    )
}

export default CartItem
