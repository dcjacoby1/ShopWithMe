function Order({order_date, order_total, item_count}){
    const formattedDate = new Date(order_date).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    return(
        <div className="order-tile">
            <div>
                <h3>Order Date:</h3> 
                <p>{formattedDate} (EST)</p>
            </div>
            <div>
                <h3>Order Total:</h3> 
                <p>${order_total}</p>
            </div>
            <div>
                <h3>Item Count:</h3> 
                <p>{item_count}</p>
            </div>
        </div>
    )
}
export default Order