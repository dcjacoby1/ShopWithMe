
function Search({search, setSearch}){
    return(
        <div className="searchbar">
            <label htmlFor="search" >Search Products:  </label>
            <input
                type="text"
                id="search"
                placeholder=" Type a name to search..."
                style={{ width: '900px', height: '30px', borderRadius: '6px', border: '2px solid #128ff9', fontSize: '20px'}}
                onChange={(event) => setSearch(event.target.value)}
                value={search}
            />
        </div>
    )
}
export default Search