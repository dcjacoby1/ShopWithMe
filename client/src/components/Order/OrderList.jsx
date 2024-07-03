import Order from "./Order"
function OrderList({orderList}){
    const mappedOrders = orderList.map(order => 
        <Order
        key={order.id}
        order_date={order.created_at}
        order_total={order.total_cost}
        item_count={order.quantity}
        />
    )
    return(
        <ul className="orders">
            {mappedOrders}
        </ul>
    )
}
export default OrderList