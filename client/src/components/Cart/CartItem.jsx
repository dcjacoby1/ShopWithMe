import { useOutletContext } from "react-router-dom"
import { useState } from "react"

function CartItem({name, image_url, initialQuantity, price, product_id, setCartItems, cartItems}) {

    const [quantity, setQuantity] = useState(initialQuantity)
    const context = useOutletContext()
    const setCartTotal = context.setCartTotal
    const setTotalCost = context.setTotalCost
  
    //functions to change specific item quantity in cart
    function subtractQuantity(){
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
                        setTotalCost(prevTotalCost => prevTotalCost + price)
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
            "Content-Type": "application/json"
        },
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

    return(
        <div className="cart-tile">
            <img src={image_url} alt={name} />
            <div className="cart-item-details">
                <div>
                    <p>Product Name</p>
                    <h3>{name}</h3>
                </div>
                <div>
                    <p>Unit Price</p>
                    <h3>${price}</h3>
                </div>
                <div>
                    <p>Total Price</p>
                    <h3>${price * quantity}</h3>
                </div>
            </div>
            <div className="cart-item-quantity">
                <div>

                    <button onClick={subtractQuantity}>-</button>
                    <p>{quantity}</p>
                    <button onClick={addQuantity}>+</button>
                </div>
                <button onClick={deleteItem} style={{fontSize: "20px"}}>remove</button>
            </div>

        </div>
    )
}
export default CartItem
