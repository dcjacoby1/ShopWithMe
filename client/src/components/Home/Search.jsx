
function Search({search, setSearch}){
    
    return(
        <div className="searchbar">
            <label htmlFor="search" >Search Products:  </label>
            <input
                type="text"
                id="search"
                className="search-input"
                placeholder=" Type a name to search..."
                onChange={(event) => setSearch(event.target.value)}
                value={search}
            />
        </div>
    )
}
export default Search