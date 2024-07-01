function CartItem({name, image_url, quantity, price}) {
    function subtractQuantity(){
        //patch cartItem
        console.log("subtract one")
    }
    function addQuantity(){
        //patch cartItem
        console.log("add one")
    }
    function deleteItem(){
        //delete cartItem
        console.log("item removed")
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
