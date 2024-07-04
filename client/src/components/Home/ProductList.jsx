import Product from "./Product";
import { useState } from "react";
import { UsePagination } from "./Pagination";
function ProductList({filteredList}){
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const siblingCount = 1;
    const pagination = UsePagination({
        totalCount: filteredList.length,
        pageSize,
        siblingCount,
        currentPage
      })
    
    const slicedProducts = filteredList.slice(
        pageSize * (currentPage - 1),
        pageSize * currentPage
    )

    const handleClick = (page) => {
        setCurrentPage(page);
    }
      
    
    const mappedProducts = slicedProducts.map(product => 
        <Product 
        key={product.id}
        name={product.name}
        price={product.price}
        image_url={product.image_url}
        product_id={product.id}
        />
    )
    return(
        <div>
            <ul className="products">{mappedProducts}</ul>
            <div
                className="pagination"
                style={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                }}
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
export default ProductList
