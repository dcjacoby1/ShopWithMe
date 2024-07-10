import Search from "./Home/Search"
import ProductList from "./Home/ProductList"
import CategoryFilter from "./Home/CategoryFilter"
import { useState, useEffect } from "react"

function Home(){
    const [productDisplay, setProductDisplay] = useState([])
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    
    const categoryFilter = selectedCategory === "All" ? productDisplay : productDisplay.filter(product => product.category === selectedCategory)
    const filteredList = categoryFilter.filter(
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
        <div className="search">
        <Search search={search} setSearch={setSearch}/>
        <CategoryFilter setSelectedCategory={setSelectedCategory} setCurrentPage={setCurrentPage}/>
        </div>
        <ProductList filteredList={filteredList} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </main>
    )
}
export default Home