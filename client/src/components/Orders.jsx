import CartList from "./Cart/CartList"
import { useState, useEffect } from "react"
import OrderList from "./Order/OrderList"
function Orders(){
    const [orderList, setOrderList] = useState([])
    useEffect(() => {
        fetch("/orders")
        .then(response => response.json())
        .then(orderList => {
            if (Array.isArray(orderList)){ 
                setOrderList(orderList)
            } else {
                setOrderList([])
            }
        })
      },[])
    
    if (orderList.length === 0){
        return <p>No orders placed</p>
    }
    return(
        <main>
        <h2>Orders</h2>
        <OrderList orderList={orderList}/>
        </main>
    )
}
export default Orders