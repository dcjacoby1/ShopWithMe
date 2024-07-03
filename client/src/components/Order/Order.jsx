function Order({order_date, order_total, item_count}){
    return(
        <li className="order-tile">
            <p>Order Date: {order_date}</p>
            <p>Order Total: ${order_total}</p>
            <p>Item Count: {item_count}</p>

        </li>
    )
}
export default Order