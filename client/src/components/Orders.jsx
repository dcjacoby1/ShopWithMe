import { useOutletContext, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import OrderList from "./Order/OrderList"

function Orders(){
    const [orderList, setOrderList] = useState([])
    const navigate = useNavigate()
    const context = useOutletContext()
    const loggedInUser = context.loggedInUser
    
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
    
    if (!loggedInUser) {
        return (<div className='not-logged-in-page'>
            <p>Sign in to view orders</p>
            <button onClick={() => navigate('/auth')}>Sign In</button>
            </div>)
    }

    if (orderList.length === 0){
        return <p className='empty-page'>No Orders Placed</p>
    }
    

    return(
        <main>
        <h2>Orders</h2>
        <OrderList orderList={orderList}/>
        </main>
    )
}
export default Orders