
function Search({search, setSearch}){
    return(
        <div className="searchbar">
            <label htmlFor="search">Search Products:</label>
            <input
                type="text"
                id="search"
                placeholder="Type a name to search..."
                // changes the search value for each type to equal value...
                //  where value is search
                onChange={(event) => setSearch(event.target.value)}
                value={search}
            />
        </div>
    )
}
export default Search