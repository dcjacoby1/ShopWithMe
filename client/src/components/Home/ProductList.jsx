import Product from "./Product";
function ProductList({filteredList}){
const mappedProducts = filteredList.map(product => <Product key={product.id} name={product.name} price={product.price} image_url={product.image_url}/>)
    return(
        <ul classname="products">{mappedProducts}</ul>
    )
}
export default ProductList
