import { useNavigate, useOutletContext } from 'react-router-dom'
import API_BASE_URL from "../config"

function Product({name, price, image_url, product_id}){
    const navigate = useNavigate()
    const context = useOutletContext()
    const setCartTotal = context.setCartTotal
    const setTotalCost = context.setTotalCost
    const loggedInUser = context.loggedInUser
    
    function handleCart(){ 
        if (loggedInUser) {
            //can take out console.log after testing
            console.log('Adding to cart - User:', loggedInUser);
            console.log('Product ID:', product_id);
            
            fetch(`${API_BASE_URL}/add_to_cart`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    product_id: product_id
                })
                }).then(resp => {
                    //can take out console.log after testing
                    console.log('Add to Cart Response Status:', resp.status);
                    console.log('Add to Cart Response Headers:', Object.fromEntries(resp.headers.entries()));
                    
                    if (resp.ok) {
                        resp.json().then(data => {
                            //can take out console.log after testing
                            console.log('Add to Cart Success:', data);
                            setCartTotal(prevCartTotal => prevCartTotal + 1)
                            setTotalCost(prevTotalCost => prevTotalCost + price)
                        })
                    } else {
                        resp.json().then(error => {
                            console.log('Add to Cart Error:', error);
                        });
                    }
                })
                .catch(error => {
                    console.log('Add to Cart Fetch Error:', error);
                });
        } else {
            navigate('/auth')
        }
    }

    return(
        <li className="product-tile">
            <img src={image_url} alt={name} />
            <div className="product-details">
                <h4>{name} / ${price}</h4>
                <button onClick={handleCart} className="add-to-cart-button">Add To Cart</button>
            </div>
        </li>
    )
}
export default Product