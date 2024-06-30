import Search from "./Home/Search"
import ProductList from "./Home/ProductList"

import { useState, useEffect } from "react"

function Home(){
    const [productDisplay, setProductDisplay] = useState([])
    const [search, setSearch] = useState('')
    const filteredList = productDisplay.filter(
        (product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
    )
    //useEffect to fetch products
    useEffect(() => {
        fetch("/products")
        .then(response => response.json())
        .then(products => setProductDisplay(products))
      },[])

    return(
        <main>
        <h2>Home</h2>
        <Search search={search} setSearch={setSearch}/>
        <ProductList filteredList={filteredList}/>
        </main>
    )
}
export default Home