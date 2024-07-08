import Order from "./Order"
import { useState } from "react"
import { UsePagination } from "../Home/Pagination"
function OrderList({orderList}){
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const siblingCount = 1;
    const pagination = UsePagination({
        totalCount: orderList.length,
        pageSize,
        siblingCount,
        currentPage
    })
    const slicedOrders = orderList.slice(
        pageSize * (currentPage - 1),
        pageSize * currentPage
    )
    const handleClick = (page) => {
        setCurrentPage(page);
    }

    const mappedOrders = slicedOrders.map(order => 
        <Order
        key={order.id}
        order_date={order.created_at}
        order_total={order.total_cost}
        item_count={order.quantity}
        />
    )
    return(
        <div>
            <div className="orders">{mappedOrders}</div>
            <div
                className="pagination"
            > 
                {pagination.map((page, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(page)}
                    className={currentPage === page ? "active" : ""}
                    style={{ fontSize: "20px", padding: "10px 20px" }}
                >
                    {page}
                </button>
                ))}
            </div>
        </div>
    )
}
export default OrderList