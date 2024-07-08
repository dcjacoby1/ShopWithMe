import { useOutletContext } from 'react-router-dom';

function Product({name, price, image_url, product_id}){
    const context = useOutletContext()
    const setCartTotal = context.setCartTotal
    const setTotalCost = context.setTotalCost
    
    function handleCart(){ 

        fetch('/add_to_cart', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                product_id: product_id
            })
            }).then(resp => {
                if (resp.ok) {
                    resp.json().then(data => {
                        setCartTotal(prevCartTotal => prevCartTotal + 1)
                        setTotalCost(prevTotalCost => prevTotalCost + price)
                    })
                }
            })       
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