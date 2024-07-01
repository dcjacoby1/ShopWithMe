import { useOutletContext } from 'react-router-dom';

function Product({name, price, image_url, product_id}){
    const context = useOutletContext()
    const setCartTotal = context.setCartTotal
    
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
                        console.log(data)
                    })
                }
            })       
    }

    return(
        <li className="product-tile">
            <img src={image_url} alt={name} />
            <h4>{name}</h4>
            <p>Price: ${price}</p>
            <button onClick={handleCart}>Add To Cart</button>

        </li>
    )
}
export default Product