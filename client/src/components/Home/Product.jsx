
function Product({name, price, image_url}){
    return(
        <li className="product-tile">
            <img src={image_url} alt={name} />
            <h4>{name}</h4>
            <p>Price: ${price}</p>
            <button>Add To Cart</button>

        </li>
    )
}
export default Product